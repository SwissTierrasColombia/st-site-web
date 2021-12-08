import { MakeDeliveryToManagerInterface } from '../models/make-delivery-to-manager.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Component, OnInit } from '@angular/core';
import { GetWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { FindProductsFromManagerInterface } from '../models/find-products-from-manager.interface';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { LevCatReceptionService } from '../lev-cat-reception.service';

@Component({
  selector: 'app-make-delivery-manager',
  templateUrl: './make-delivery-manager.component.html',
  styleUrls: ['./make-delivery-manager.component.scss'],
})
export class MakeDeliveryManagerComponent implements OnInit {
  dataWorkspacesByOperator: GetWorkspacesByOperatorInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  managerCodeAndMunicipality: string = '0';
  dataMakeDeliveryToManager: MakeDeliveryToManagerInterface;
  createActive: boolean = false;
  optionModalRef: NgbModalRef;
  constructor(
    private workspacesService: WorkspacesService,
    private levCatReceptionService: LevCatReceptionService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dataMakeDeliveryToManager = {
      deliveredProducts: [],
      managerCode: '0',
      municipalityCode: '0',
      observations: '',
    };
  }
  ngOnInit(): void {
    this.workspacesService
      .getWorkspacesByOperator()
      .subscribe((response: GetWorkspacesByOperatorInterface[]) => {
        this.dataWorkspacesByOperator = response;
        this.dataWorkspacesByOperator.forEach((element) => {
          this.listManagerWithMunicipality.push({
            id: element.managerCode + ' - ' + element.municipality.code,
            option: element.manager.alias + ' - ' + element.municipality.name,
          });
        });
      });
  }
  managersAndMunicipality(): void {
    let codes = this.managerCodeAndMunicipality.split(' - ');
    this.dataMakeDeliveryToManager.managerCode = codes[0];
    this.dataMakeDeliveryToManager.municipalityCode = codes[1];
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  change() {
    this.createActive = false;
    if (
      this.managerCodeAndMunicipality != '0' &&
      this.dataMakeDeliveryToManager.observations
    ) {
      this.createActive = true;
    }
  }
  openModalCreateDelivery() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Desea crear un borrador de entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a preparar una entrega para el Gestor.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.makeDeliveryToManager();
        }
      }
    });
  }
  buildDeliveredProducts(item: FindProductsFromManagerInterface) {
    const isSelect = this.dataMakeDeliveryToManager.deliveredProducts.find(
      (element) => {
        return element == item.id;
      }
    );
    if (!isSelect) {
      this.dataMakeDeliveryToManager.deliveredProducts.push(item.id);
    } else {
      this.dataMakeDeliveryToManager.deliveredProducts =
        this.dataMakeDeliveryToManager.deliveredProducts.filter((element) => {
          return element !== item.id;
        });
    }
  }
  makeDeliveryToManager() {
    this.levCatReceptionService
      .makeDeliveryToManager(this.dataMakeDeliveryToManager)
      .subscribe((_) => {
        this.toastr.success('Ha creado una entrega');
        this.managerCodeAndMunicipality = '0';
        this.dataMakeDeliveryToManager = {
          deliveredProducts: [],
          managerCode: '0',
          municipalityCode: '0',
          observations: '',
        };
        this.change();
      });
  }
}
