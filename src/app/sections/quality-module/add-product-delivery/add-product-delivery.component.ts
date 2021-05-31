import { QualityService } from './../quality.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { ItemDelivery } from '../models/find-deliveries.interface';
import { FindProductsFromDeliveryInterface } from '../models/find-products-from-delivery.interface';
import { FindProductsFromManagerInterface } from '../models/find-products-from-manager.interface';
import { GetWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { AddProductToDeliveryInterface } from '../models/add-product-to-delivery.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-delivery',
  templateUrl: './add-product-delivery.component.html',
  styleUrls: ['./add-product-delivery.component.scss'],
})
export class AddProductDeliveryComponent implements OnInit {
  dataDelivery: ItemDelivery;
  productsFromDelivery: FindProductsFromDeliveryInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  listProductsDelivery: selectInterface[] = [];
  selecProductsDelivery: string = '0';
  managerCodeAndMunicipality: string = '0';
  dataProductsFromManager: FindProductsFromManagerInterface[] = [];
  optionModalRef: NgbModalRef;
  deliveryId: number;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private qualityService: QualityService,
    private workspacesService: WorkspacesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.workspacesService
      .getWorkspacesByOperator()
      .subscribe((response: GetWorkspacesByOperatorInterface[]) => {
        response.forEach((element) => {
          this.listManagerWithMunicipality.push({
            id: element.managerCode + ' - ' + element.municipality.code,
            option: element.manager.alias + ' - ' + element.municipality.name,
          });
        });
      });
    this.activedRoute.params.subscribe((params: Params) => {
      this.deliveryId = params.deliveryId;
      this.qualityService
        .searchDelivery(params.deliveryId)
        .subscribe((response) => {
          this.dataDelivery = response;
          this.managerCodeAndMunicipality =
            this.dataDelivery.managerCode +
            ' - ' +
            this.dataDelivery.municipalityCode;
          this.dataDelivery.deliveryDate = this.formatDate(
            this.dataDelivery.deliveryDate
          );
          this.findProductsFromDelivery(params.deliveryId);
          this.qualityService
            .findProductsFromManager(this.dataDelivery.managerCode)
            .subscribe((response) => {
              this.dataProductsFromManager = response;
              this.dataProductsFromManager.forEach((element) => {
                this.listProductsDelivery.push({
                  id: element.id.toString(),
                  option: element.name,
                });
              });
            });
        });
    });
  }
  findProductsFromDelivery(deliveryId: number) {
    this.qualityService
      .findProductsFromDelivery(deliveryId)
      .subscribe((response) => {
        this.productsFromDelivery = response;
      });
  }
  changeIdProduct(item: number, key: string): string {
    if (this.dataProductsFromManager.length > 0) {
      let product = this.dataProductsFromManager.find(
        (element) => element.id === item
      );
      return product[key];
    }
    return '';
  }
  goBack() {
    this.router.navigate(['/calidad/buscar-entregas']);
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  openModaldeleteProduct(item: FindProductsFromDeliveryInterface) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Borrar producto';
    this.optionModalRef.componentInstance.description =
      'Va eliminar un producto de entrega.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.qualityService
            .removeProductFromDelivery(this.deliveryId, item.id)
            .subscribe((_) => {
              this.toastr.success('Ha eliminado un producto');
              this.productsFromDelivery = this.productsFromDelivery.filter(
                (element) => element.id != item.id
              );
            });
        }
      }
    });
  }
  openAddProductToDelivery() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    this.optionModalRef.componentInstance.title = 'Agregar producto';
    this.optionModalRef.componentInstance.description =
      'Va agregar un producto a la entrega.';
    this.optionModalRef.componentInstance.disableButtonClose = true;
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          let product: AddProductToDeliveryInterface = {
            productId: parseInt(this.selecProductsDelivery),
          };
          this.qualityService
            .addProductToDelivery(this.deliveryId, product)
            .subscribe((_) => {
              this.toastr.success('Ha agregado un producto a la entrega');
              this.selecProductsDelivery = '0';
              this.findProductsFromDelivery(this.deliveryId);
            });
        }
      }
    });
  }
  nameStateDelivery(deliveryStatusId: number): string {
    return FuntionsGlobalsHelper.nameStateDelivery(deliveryStatusId);
  }
  nameStateProduct(deliveryProductStatusId: number): string {
    return FuntionsGlobalsHelper.nameDeliveryProductStatusId(
      deliveryProductStatusId
    );
  }
  openModalUpdateProduct(modal: TemplateRef<any>) {
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }
  closeModalProductDelivery(itemDelivery: FindProductsFromDeliveryInterface) {
    let data = {
      observations: itemDelivery.observations,
    };
    this.qualityService.updateDelivery(itemDelivery.id, data).subscribe((_) => {
      this.modalService.dismissAll();
      this.toastr.success('Actualización realizada');
    });
  }
}
