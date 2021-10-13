import { Role } from '../../../shared/models/decoded-token.interface';
import { rolesEnum } from '../../../shared/models/roles.enum';
import { JwtHelper } from '../../../shared/helpers/jwt';
import { StatesDeliveriesEnum } from '../models/states-deliveries.enum';
import { StatusAttachmentsXTF } from '../models/status-attachment-XTF.enum';
import { FtpAttachmentProductInterface } from '../models/ftp-attachment-product.interface';
import { TypeAttachmentsProduct } from '../models/type-attachments-product.enum';
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
  tab: string = '0';
  isUpdateTableProduct: boolean = true;
  isLoadAttachment: boolean = false;
  listTypeModel: selectInterface[] = [];
  modelVersionAttachment: string = '0';
  isConnectManager: boolean = false;
  isConnectOperator: boolean = false;
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
    this.listTypeModel = [
      {
        id: '1.0',
        option: 'Versión 1.0',
      },
      {
        id: '1.1',
        option: 'Versión 1.1',
      },
    ];
  }

  ngOnInit(): void {
    this.user = JwtHelper.getUserPublicInformation();
    this.isOperator = this.user.roles.find(
      (item) => item.id === rolesEnum.operador
    );
    this.activedRoute.params.subscribe((params: Params) => {
      this.isConnectManager = 'true' === params.isManager;
      this.isConnectOperator = 'true' === params.isOperator;
      this.initPageServices(params);
      this.tab = params.tab;
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
    this.router.navigate(['/calidad/buscar-entregas/' + this.tab]);
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  openModaldeleteProduct(item: FindProductsFromDeliveryInterface) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro eliminar el producto de la entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a eliminar un producto de la entrega.';
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
        console.log(this.listAttachmentsDeliveryProduct);
        this.document = null;
        this.dataFTP = {
          domain: '',
          password: '',
          port: '',
          username: '',
        };
        this.observationAttachment = '';
        this.isUpdateTableProduct = false;
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
      backdrop: 'static',
      keyboard: false,
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
    this.isLoadAttachment = true;
    this.isUpdateTableProduct = true;
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
      attachmentForm.append('xtf.version', this.modelVersionAttachment);
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
      .subscribe(
        (_) => {
          this.selectTypeAttachment = '0';
          this.toastr.success('Adjunto añadido con exito');
          this.findAttachmentFromProduct(deliveryProductId);
          this.findProductsFromDelivery(this.deliveryId);
          this.isLoadAttachment = false;
          this.isUpdateTableProduct = false;
        },
        (error) => {
          this.selectTypeAttachment = '0';
          this.findAttachmentFromProduct(deliveryProductId);
          this.findProductsFromDelivery(this.deliveryId);
          this.isLoadAttachment = false;
          this.isUpdateTableProduct = false;
        }
      );
  }
  deleteAttachment(deliveryProductId: number, attachmentId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Va a eliminar un archivo del producto?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Está acción eliminará el archivo adjunto y no podrá recuperarse.';
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
              this.toastr.success(
                'Ha eliminado un archivo adjunto del producto'
              );
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
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de realizar esta entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a realizar una entrega al Gestor.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .sendDeliveryToManager(this.deliveryId)
            .subscribe((_) => {
              this.dataDelivery.deliveryStatusId =
                StatesDeliveriesEnum.ENTREGADO;
              this.toastr.success('Ha enviado la entrega al gestor');
              this.goBack();
            });
        }
      }
    });
  }
  changeUpdaateInfoProduct(item: FindProductsFromDeliveryInterface) {
    this.disabledButtonAttachment = true;
    if (this.selectTypeAttachment != '0') {
      if (this.selectTypeAttachment === TypeAttachmentsProduct.DOCUMENTO) {
        if (
          item.observations != '' &&
          this.document &&
          this.observationAttachment != ''
        ) {
          this.disabledButtonAttachment = false;
        }
      }
      if (this.selectTypeAttachment === TypeAttachmentsProduct.XTF) {
        if (
          item.observations != '' &&
          this.document &&
          this.observationAttachment != '' &&
          this.modelVersionAttachment != '0'
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
        FuntionsGlobalsHelper.downloadFile(
          data,
          'archivo-' +
            this.dataDelivery.code +
            '-' +
            this.dataDelivery.municipalityName +
            '-' +
            deliveryProductId +
            '-' +
            attachmentId
        );
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
        this.toastr.success('Ha realizado un feedback');
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
  openModalAcceptProduct(deliveryProductId: number, modal: TemplateRef<any>) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = '¿Desea aceptar el producto?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a aceptar un producto de la entrega.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .acceptDeliveryProduct(this.deliveryId, deliveryProductId)
            .subscribe((_) => {
              this.toastr.success('Ha aceptado el producto');
              this.findProductsFromDelivery(this.deliveryId);
              this.openModalFeedback(modal, deliveryProductId);
            });
        }
      }
    });
  }
  openModalRejectProduct(deliveryProductId: number, modal: TemplateRef<any>) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Desea rechazar el producto?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a rechazar un producto de la entrega.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .rejectDeliveryProduct(this.deliveryId, deliveryProductId)
            .subscribe((_) => {
              this.findProductsFromDelivery(this.deliveryId);
              this.openModalFeedback(modal, deliveryProductId);
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
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de aceptar esta entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta estrega será recibida y aceptada por el Gestor.';
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
  rejectedDelivery() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de rechazar esta entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta estrega será rechazada.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .rejectedDelivery(this.deliveryId)
            .subscribe((_) => {
              this.toastr.success('Entrega rechazada');
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
    this.optionModalRef.componentInstance.title =
      '¿Desea enviar a corrección la entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a enviar a corrección los productos <strong>no aprobados</strong> de esta entrega.';
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
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de enviar esta corrección al Gestor?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a enviar una corrección a la entrega.';
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
  downloadFeedback(deliveryProductId: number, feedbackId: number) {
    this.levCatReceptionService
      .downloadFeedbackAttachment(
        this.deliveryId,
        deliveryProductId,
        feedbackId
      )
      .subscribe((data) => {
        FuntionsGlobalsHelper.downloadFile(
          data,
          'feedback-' +
            this.dataDelivery.code +
            '-' +
            deliveryProductId +
            '-' +
            feedbackId
        );
      });
  }
  statusOnlyProduct1(status: number): boolean {
    let value = this.listProductsFromDelivery.find(
      (element) => element.deliveryProductStatusId === status
    );
    return value ? true : false;
  }
  statusOnlyProduct2(status: number): boolean {
    let value = this.listProductsFromDelivery.find(
      (element) => element.deliveryProductStatusId === status
    );
    return value ? false : true;
  }
  createTaskQualityAttachment(deliveryProductId: number, attachmentId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de enviar el archivo XTF a control de calidad?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a enviar una archivo XTF a control de calidad.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .createTaskQualityAttachment(
              this.deliveryId,
              deliveryProductId,
              attachmentId
            )
            .subscribe((_) => {
              this.toastr.success('Archivo XTF enviado correctamente.');
            });
        }
      }
    });
  }
  downloadReportQualityAttachment(
    deliveryProductId: number,
    attachmentId: number
  ) {
    this.levCatReceptionService
      .downloadReportQualityAttachment(
        this.deliveryId,
        deliveryProductId,
        attachmentId
      )
      .subscribe((data) => {
        FuntionsGlobalsHelper.downloadFile(data, 'Reporte_Revision_XTF_BMP');
      });
  }
}
