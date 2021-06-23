import { Role } from './../../../shared/models/decoded-token.interface';
import { rolesEnum } from './../../../shared/models/roles.enum';
import { JwtHelper } from './../../../shared/helpers/jwt';
import { StatesDeliveriesEnum } from './../models/states-deliveries.enum';
import { StatusAttachmentsXTF } from './../models/status-attachment-XTF.enum';
import { FtpAttachmentProductInterface } from './../models/ftp-attachment-product.interface';
import { TypeAttachmentsProduct } from './../models/type-attachments-product.enum';
import { LevCatReceptionService } from '../lev-cat-reception.service';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { ItemDelivery } from '../models/find-deliveries.interface';
import { FindProductsFromDeliveryInterface } from '../models/find-products-from-delivery.interface';
import { FindProductsFromManagerInterface } from '../models/find-products-from-manager.interface';
import { AddProductToDeliveryInterface } from '../models/add-product-to-delivery.interface';
import { ToastrService } from 'ngx-toastr';
import { AttachmentsFromDeliveryProductInterface } from '../models/attachments-from-delivery-product.interface';
import { environment } from 'src/environments/environment';
import { DecodedTokenInterface } from 'src/app/shared/models/decoded-token.interface';
import { StatesProductsEnum } from '../models/states-products.enum';
@Component({
  selector: 'app-add-product-delivery',
  templateUrl: './add-product-delivery.component.html',
  styleUrls: ['./add-product-delivery.component.scss'],
})
export class AddProductDeliveryComponent implements OnInit {
  dataDelivery: ItemDelivery;
  listProductsFromDelivery: FindProductsFromDeliveryInterface[] = [];
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
  listAttachmentsDeliveryProduct: AttachmentsFromDeliveryProductInterface[] =
    [];
  documentFileRef: ElementRef;
  document: File;
  disabledButtonAttachment: boolean = true;
  statusAttachmentsXTF = StatusAttachmentsXTF;
  StatesDeliveriesEnum = StatesDeliveriesEnum;
  isOperator: Role;
  user: DecodedTokenInterface;
  observationfeedback: string = '';
  listFeedBacks: any = [];
  StatesProductsEnum = StatesProductsEnum;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private levCatReceptionService: LevCatReceptionService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dataFTP = {
      domain: '',
      password: '',
      port: '',
      username: '',
    };
    this.dataDelivery = {
      id: 0,
      code: '',
      deliveryDate: '',
      managerCode: '',
      municipalityCode: '',
      observations: '',
      operatorCode: 0,
      userCode: 0,
      deliveryStatusId: 0,
      departmentName: '',
      municipalityName: '',
      managerName: '',
      operatorName: '',
    };
  }

  ngOnInit(): void {
    this.user = JwtHelper.getUserPublicInformation();
    this.isOperator = this.user.roles.find(
      (item) => item.id === rolesEnum.operador
    );
    this.activedRoute.params.subscribe((params: Params) => {
      this.initPageServices(params);
    });
  }
  initPageServices(params?: Params) {
    if (params) {
      this.deliveryId = params.deliveryId;
    }
    this.levCatReceptionService
      .searchDelivery(this.deliveryId)
      .subscribe((response) => {
        this.dataDelivery = response;
        this.listManagerWithMunicipality.push({
          id: response.managerCode + ' - ' + response.municipalityCode,
          option: response.managerName + ' - ' + response.municipalityName,
        });
        this.managerCodeAndMunicipality =
          this.dataDelivery.managerCode +
          ' - ' +
          this.dataDelivery.municipalityCode;
        this.dataDelivery.deliveryDate = this.formatDate(
          this.dataDelivery.deliveryDate
        );
        this.findProductsFromDelivery(this.deliveryId);
        this.levCatReceptionService
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
  }

  findProductsFromDelivery(deliveryId: number) {
    this.levCatReceptionService
      .findProductsFromDelivery(deliveryId)
      .subscribe((response) => {
        this.listProductsFromDelivery = response;
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
          this.levCatReceptionService
            .removeProductFromDelivery(this.deliveryId, item.id)
            .subscribe((_) => {
              this.toastr.success('Ha eliminado un producto');
              this.listProductsFromDelivery =
                this.listProductsFromDelivery.filter(
                  (element) => element.id != item.id
                );
            });
        }
      }
    });
  }
  openAddProductToDelivery() {
    let product: AddProductToDeliveryInterface = {
      productId: parseInt(this.selecProductsDelivery),
    };
    this.levCatReceptionService
      .addProductToDelivery(this.deliveryId, product)
      .subscribe((_) => {
        this.toastr.success('Ha agregado un producto a la entrega');
        this.selecProductsDelivery = '0';
        this.findProductsFromDelivery(this.deliveryId);
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
    this.levCatReceptionService
      .findAttachmentsFromDeliveryProduct(this.deliveryId, deliveryProductId)
      .subscribe((element) => {
        this.listAttachmentsDeliveryProduct = element;
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
      this.listTypeAttachmentProduct.push(
        {
          id: TypeAttachmentsProduct.DOCUMENTO,
          option: 'DOCUMENTO',
        },
        {
          id: TypeAttachmentsProduct.FTP,
          option: 'FTP',
        },
        {
          id: TypeAttachmentsProduct.XTF,
          option: 'XTF',
        }
      );
    } else {
      this.listTypeAttachmentProduct.push(
        {
          id: TypeAttachmentsProduct.DOCUMENTO,
          option: 'DOCUMENTO',
        },
        {
          id: TypeAttachmentsProduct.FTP,
          option: 'FTP',
        }
      );
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
    this.levCatReceptionService
      .updateProductFromDelivery(this.deliveryId, itemProduct.id, data)
      .subscribe((_) => {});
  }
  closeModalProductDelivery() {
    this.modalService.dismissAll();
  }
  documentProduct(file: FileList, item: FindProductsFromDeliveryInterface) {
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      let re = /zip*/;
      if (file[0].type.match(re)) {
        this.document = file[0];
        this.changeUpdaateInfoProduct(item);
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
    this.disabledButtonAttachment = true;
    if (StatesDeliveriesEnum.BORRADOR == this.dataDelivery.deliveryStatusId) {
      this.updateObservationProductDelivery(item);
    }
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
    this.levCatReceptionService
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
      'Va ha eliminar un adjunto del producto';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .removeAttachmentFromProduct(
              this.deliveryId,
              deliveryProductId,
              attachmentId
            )
            .subscribe((_) => {
              this.toastr.success('Ha eliminado un adjunto del producto');
              this.listAttachmentsDeliveryProduct =
                this.listAttachmentsDeliveryProduct.filter(
                  (item) => item.attachmentId != attachmentId
                );
            });
        }
      }
    });
  }
  sendDeliveryToManager() {
    this.levCatReceptionService
      .sendDeliveryToManager(this.deliveryId)
      .subscribe((_) => {
        this.dataDelivery.deliveryStatusId = StatesDeliveriesEnum.ENTREGADO;
        this.toastr.success('Ha enviado la entrega al gestor');
        this.goBack();
      });
  }
  changeUpdaateInfoProduct(item: FindProductsFromDeliveryInterface) {
    this.disabledButtonAttachment = true;
    if (this.selectTypeAttachment != '0') {
      if (
        this.selectTypeAttachment === TypeAttachmentsProduct.DOCUMENTO ||
        this.selectTypeAttachment === TypeAttachmentsProduct.XTF
      ) {
        if (
          item.observations != '' &&
          this.document &&
          this.observationAttachment != ''
        ) {
          this.disabledButtonAttachment = false;
        }
      }
      if (this.selectTypeAttachment === TypeAttachmentsProduct.FTP) {
        if (
          item.observations != '' &&
          this.dataFTP.domain != '' &&
          this.dataFTP.port != '' &&
          this.dataFTP.password != '' &&
          this.dataFTP.username != '' &&
          this.observationAttachment != ''
        ) {
          this.disabledButtonAttachment = false;
        }
      }
    }
  }
  downloadAttachment(deliveryProductId: number, attachmentId: number) {
    this.levCatReceptionService
      .downloadAttachment(this.deliveryId, deliveryProductId, attachmentId)
      .subscribe((data) => {
        FuntionsGlobalsHelper.downloadFile(data);
      });
  }
  findFeedback(deliveryProductId: number) {
    this.levCatReceptionService
      .findFeedbacks(this.deliveryId, deliveryProductId)
      .subscribe((element) => {
        this.listFeedBacks = element;
      });
  }
  openModalFeedback(modal: TemplateRef<any>, deliveryProductId: number) {
    this.findFeedback(deliveryProductId);
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }
  documentFeedback(file: FileList) {
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
  createFeedback(deliveryProductId: number) {
    let form = new FormData();
    form.append('feedback', this.observationfeedback);
    if (this.document) {
      form.append('attachment', this.document);
    }
    this.levCatReceptionService
      .createFeedback(this.deliveryId, deliveryProductId, form)
      .subscribe((_) => {
        this.observationfeedback = '';
        this.document = null;
        this.findFeedback(deliveryProductId);
      });
  }
  startReviewManager() {
    this.levCatReceptionService
      .startReviewManagerOrFinalizeCorrectionsOperator(this.deliveryId)
      .subscribe((_) => {
        this.toastr.success('Ha iniciado la revisión');
        this.initPageServices();
      });
  }
  openModalAcceptProduct(deliveryProductId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Aceptar producto';
    this.optionModalRef.componentInstance.description =
      'Va aceptar el producto';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .acceptDeliveryProduct(this.deliveryId, deliveryProductId)
            .subscribe((_) => {
              this.toastr.success('Ha aceptado el producto');
              this.findProductsFromDelivery(this.deliveryId);
            });
        }
      }
    });
  }
  openModalRejectProduct(deliveryProductId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Rechazar producto';
    this.optionModalRef.componentInstance.description = 'Va rechazar producto';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .rejectDeliveryProduct(this.deliveryId, deliveryProductId)
            .subscribe((_) => {
              this.findProductsFromDelivery(this.deliveryId);
            });
        }
      }
    });
  }
  acceptDelivery() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Aceptar entrega';
    this.optionModalRef.componentInstance.description = 'Va aceptar la entrega';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .acceptDelivery(this.deliveryId)
            .subscribe((_) => {
              this.toastr.success('Entrega aceptada');
              this.initPageServices();
            });
        }
      }
    });
  }
  returnDeliveryToOperator() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Enviar a corrección';
    this.optionModalRef.componentInstance.description =
      'Va enviar a corrección la entrega';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .returnDeliveryToOperator(this.deliveryId)
            .subscribe((_) => {
              this.toastr.success('Entrega enviada a corrección');
              this.initPageServices();
            });
        }
      }
    });
  }
  returnDeliveryToManager() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Enviar corrección';
    this.optionModalRef.componentInstance.description =
      'Va enviar la corrección de la entrega';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .startReviewManagerOrFinalizeCorrectionsOperator(this.deliveryId)
            .subscribe((_) => {
              this.toastr.success('Entrega corregida enviada');
              this.goBack();
            });
        }
      }
    });
  }
}
