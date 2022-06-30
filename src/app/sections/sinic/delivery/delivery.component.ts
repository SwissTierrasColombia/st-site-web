import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { environment } from 'src/environments/environment';
import Commons from '../commons/commons';
import { SinicService } from '../sinic.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  deliveryId: number;
  delivery: any = {
    code: '',
    locality: {
      department: '',
      municipality: '',
    },
    manager: {
      name: '',
    },
    date: '',
    dateStatus: '',
  };
  isAdministrator: boolean = false;
  tab: number;
  id: number = 0;
  supportFile: string = '';
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  observations: string = '';
  editMode: boolean = false;
  formOk: boolean = false;
  listFiles: any = [];
  optionModalRef: NgbModalRef;
  errorXTF: string = '';
  isManager: boolean = false;
  selectDepartment: string;
  selectMunicipality: string;
  selectManagerId: string;
  selectStates: string;
  code: string;
  sendAuthority: boolean = false;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sinicService: SinicService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      const isAdmin = params.isAdministrator;
      this.isAdministrator = isAdmin == 'true';
      this.deliveryId = Number(params.deliveryId);
      this.tab = params.tab;
      const isManager = params.isAdministrator;
      this.isManager = isManager == 'true';
      this.selectDepartment = params.selectDepartment;
      this.selectMunicipality = params.selectMunicipality;
      this.selectManagerId = params.selectManagerId;
      this.selectStates = params.selectStates;
      this.code = params.code;
      this.findDelivery(this.deliveryId);
    });
  }

  findDelivery(deliveryId: number) {
    this.sinicService.searchDelivery(deliveryId).subscribe((element) => {
      this.delivery = element;
    });
    this.findFiles(deliveryId);
  }
  findFiles(deliveryId: number) {
    this.sinicService.findFilesFromDelivery(deliveryId).subscribe((element) => {
      this.listFiles = element;
      this.sendAuthority = this.findSuccessFiles();
    });
  }
  nameStateDelivery(deliveryStatusId: string): string {
    return Commons.nameStateDelivery(deliveryStatusId);
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  goBack() {
    this.router.navigate([
      '/sinic/listar-entregas/' + this.tab,
      {
        isAdministrator: this.isAdministrator,
        isManager: this.isManager,
        selectDepartment: this.selectDepartment,
        selectMunicipality: this.selectMunicipality,
        selectManagerId: this.selectManagerId,
        selectStates: this.selectStates,
        code: this.code,
      },
    ]);
  }
  docSoport(file: File) {
    this.changeData();
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      const re = /zip*/;
      if (file[0].type.match(re)) {
        this.supportFile = file[0];
        this.changeData();
      } else {
        this.supportFile = '';
        this.myInputVariable.nativeElement.value = '';
        this.toastr.error('Solo se permiten archivos ZIP');
      }
    } else {
      this.supportFile = '';
      this.myInputVariable.nativeElement.value = '';
      this.toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }
  changeData() {
    this.formOk = false;
    if (this.supportFile !== '' && this.observations !== '') {
      this.formOk = true;
    }
  }
  create() {
    let data = new FormData();
    data.append('observations', this.observations);
    data.append('attachment', this.supportFile);
    this.sinicService.addFileToDelivery(this.deliveryId, data).subscribe(
      (_) => {
        this.toastr.success('Adjunto añadido exitosamente');
        this.findFiles(this.deliveryId);
        this.observations = '';
        this.supportFile = '';
        this.myInputVariable.nativeElement.value = '';
        this.formOk = false;
      },
      (error: any) => {
        if (error.status == 504 || error.statusCode == 504) {
          this.toastr.success('Adjunto añadido exitosamente');
        }
      }
    );
  }
  findSuccessFiles(): boolean {
    if (this.listFiles.length === 0) {
      return false;
    }
    let isValid = this.listFiles.find(
      (item) => item.isValid === false || item.isValid === null
    );
    if (isValid) {
      return false;
    } else {
      return true;
    }
  }
  save() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      'Usted va a REPORTAR la información Catastral del MUNICIPIO en formato XTF a la Autoridad Catastral';
    this.optionModalRef.componentInstance.description =
      'Advertencia: ¿Está seguro de hacerlo?';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.sinicService.sendAuthority(this.deliveryId).subscribe((_) => {
            this.toastr.success(
              'Se ha enviado correctamente a la autoridad catastral'
            );
            this.findDelivery(this.deliveryId);
            this.sendAuthority = false;
          });
        }
      }
    });
  }
  cancel() {
    this.id = 0;
    this.editMode = false;
    this.formOk = false;
    this.supportFile = '';
    this.myInputVariable.nativeElement.value = '';
    this.observations = '';
  }
  deleteAttachment(file: any) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de eliminar el adjunto?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va ha eliminar el archivo cargado.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.sinicService
            .removeFile(this.deliveryId, file.id)
            .subscribe((_) => {
              this.toastr.success('Ha eliminado el adjunto');
              this.listFiles = this.listFiles.filter(
                (element) => element.id !== file.id
              );
              this.sendAuthority = this.findSuccessFiles();
            });
        }
      }
    });
  }
  downloadLog(item: any) {
    this.sinicService
      .downloadLog(this.deliveryId, item.id)
      .subscribe((data) => {
        const nameFile = `archivo-${this.delivery.code}-${item.id}`;
        FuntionsGlobalsHelper.downloadFile(data, nameFile, '.zip');
      });
  }

  downloadFile(item: any) {
    this.sinicService
      .downloadFile(this.deliveryId, item.id)
      .subscribe((data) => {
        const nameFile = `archivo-${this.deliveryId}-${item.id}`;
        FuntionsGlobalsHelper.downloadFile(data, nameFile, '.zip');
      });
  }
  changeNameStateFile(state: string) {
    return Commons.nameStateFile(state);
  }
}
