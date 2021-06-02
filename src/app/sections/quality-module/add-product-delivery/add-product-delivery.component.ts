import { FtpAttachmentProductInterface } from './../models/ftp-attachment-product.interface';
import { TypeAttachmentsProduct } from './../models/type-attachments-product.enum';
import { QualityService } from './../quality.service';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
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
import { AttachmentsFromDeliveryProductInterface } from '../models/attachments-from-delivery-product.interface';
import { environment } from 'src/environments/environment';

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
  listTypeAttachmentProduct: selectInterface[] = [];
  selecProductsDelivery: string = '0';
  managerCodeAndMunicipality: string = '0';
  dataProductsFromManager: FindProductsFromManagerInterface[] = [];
  optionModalRef: NgbModalRef;
  deliveryId: number;
  selectProduct: string | FindProductsFromManagerInterface;
  selectTypeAttachment: string = '0';
  typeAttachmentsProduct = TypeAttachmentsProduct;
  observationAttachment: string;
  dataFTP: FtpAttachmentProductInterface;
  attachmentsDeliveryProduct: AttachmentsFromDeliveryProductInterface[] = [];
  documentFileRef: ElementRef;
  document: File;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private qualityService: QualityService,
    private workspacesService: WorkspacesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dataFTP = {
      domain: '',
      password: '',
      port: '',
      username: '',
    };
  }

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
  changeIdProduct(
    item: number,
    key?: string
  ): string | FindProductsFromManagerInterface {
    if (this.dataProductsFromManager.length > 0) {
      let product = this.dataProductsFromManager.find(
        (element) => element.id === item
      );
      if (key) {
        return product[key];
      }
      return product;
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
  findAttachmentFromProduct(deliveryProductId: number) {
    this.qualityService
      .findAttachmentsFromDeliveryProduct(this.deliveryId, deliveryProductId)
      .subscribe((element) => {
        this.attachmentsDeliveryProduct = element;
        console.log(element);
        this.document = null;
        this.dataFTP = {
          domain: '',
          password: '',
          port: '',
          username: '',
        };
        this.observationAttachment = '';
      });
  }
  openModalUpdateProduct(
    modal: TemplateRef<any>,
    productId: number,
    deliveryProductId: number
  ) {
    this.listTypeAttachmentProduct = [];
    this.selectTypeAttachment = '0';
    this.selectProduct = this.changeIdProduct(
      productId
    ) as FindProductsFromManagerInterface;
    if (this.selectProduct.isXTF) {
      for (const key in TypeAttachmentsProduct) {
        this.listTypeAttachmentProduct.push({
          id: TypeAttachmentsProduct[key],
          option: key,
        });
      }
    } else {
      this.listTypeAttachmentProduct.push({
        id: TypeAttachmentsProduct.DOCUMENTO,
        option: 'DOCUMENTO',
      });
      this.listTypeAttachmentProduct.push({
        id: TypeAttachmentsProduct.FTP,
        option: 'FTP',
      });
    }
    this.findAttachmentFromProduct(deliveryProductId);
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
      size: 'xl',
    });
  }
  updateObservationProductDelivery(
    itemProduct: FindProductsFromDeliveryInterface
  ) {
    let data = {
      observations: itemProduct.observations,
    };
    this.qualityService
      .updateProductFromDelivery(this.deliveryId, itemProduct.productId, data)
      .subscribe((_) => {});
  }
  closeModalProductDelivery() {
    this.modalService.dismissAll();
  }
  documentProduct(file: FileList) {
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      let re = /zip*/;
      if (file[0].type.match(re)) {
        this.document = file[0];
      } else {
        this.toastr.error('Por favor comprima el archivo en .zip.');
      }
    } else {
      this.document = null;
      this.documentFileRef.nativeElement.value = '';
      this.toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }
  addAttachmentToProduct(
    deliveryProductId: number,
    item: FindProductsFromDeliveryInterface
  ) {
    this.updateObservationProductDelivery(item);
    let attachmentForm = new FormData();
    if (this.selectTypeAttachment === TypeAttachmentsProduct.DOCUMENTO) {
      attachmentForm.append('document.attachment', this.document);
    }
    if (this.selectTypeAttachment === TypeAttachmentsProduct.XTF) {
      attachmentForm.append('xtf.attachment', this.document);
    }
    if (this.selectTypeAttachment === TypeAttachmentsProduct.FTP) {
      attachmentForm.append('ftp.domain', this.dataFTP.domain);
      attachmentForm.append('ftp.port', this.dataFTP.port);
      attachmentForm.append('ftp.username', this.dataFTP.username);
      attachmentForm.append('ftp.password', this.dataFTP.password);
    }
    attachmentForm.append('observations', this.observationAttachment);
    this.qualityService
      .addAttachmentToProduct(
        this.deliveryId,
        deliveryProductId,
        attachmentForm
      )
      .subscribe((_) => {
        this.selectTypeAttachment = '0';
        this.toastr.success('Adjunto añadido con exito');
        this.findAttachmentFromProduct(deliveryProductId);
      });
  }
  deleteAttachment(deliveryProductId: number, attachmentId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Eliminar Adjunto';
    this.optionModalRef.componentInstance.description =
      'Va ha eliminaar un adjunto del producto';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.qualityService
            .removeAttachmentFromProduct(
              this.deliveryId,
              deliveryProductId,
              attachmentId
            )
            .subscribe((element) => {
              console.log(element);
              this.toastr.success('Ha eliminado un adjunto del producto');
            });
        }
      }
    });
  }
  sendDeliveryToManager() {
    this.qualityService
      .sendDeliveryToManager(this.deliveryId)
      .subscribe((element) => {
        console.log(element);
      });
  }
}
