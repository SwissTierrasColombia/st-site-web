import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-cargue',
  templateUrl: './cargue.component.html',
  styleUrls: ['./cargue.component.scss'],
})
export class CargueComponent implements OnInit, AfterViewInit {
  idInsumo: string;
  dataRequestPending: any;
  type: any;
  xtf: any;
  respuestaValidador: any;
  button: any;
  closeRequestButton: boolean;
  closeRequestButtonArray: any;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  previewData: FileList;
  fileUrl = '';
  errorXTF: string;
  skipGeometryValidation: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    public typeDataFieldModel: TypeDataSuppliesModel,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {
    this.respuestaValidador = [
      {
        isValid: null,
      },
    ];
    this.xtf = true;
    this.button = { status: true };
    this.idInsumo = '0';
    this.dataRequestPending = [];
    this.type = [
      {
        name: 'Archivo',
        file: 'file',
      },
      {
        name: 'URL',
        file: 'url',
      },
      {
        name: 'No disponible',
        file: 'none',
      },
    ];
    this.closeRequestButton = true;
    this.closeRequestButtonArray = [];
    this.errorXTF = '';
    this.skipGeometryValidation = false;
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  ngOnInit() {
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe((response) => {
        this.idInsumo = response.idInsumo;
        resolve(response);
      });
    });
    const promise2 = new Promise((resolve) => {
      this.serviceWorkspaces.getPendingRequestByProvider().subscribe((data) => {
        this.dataRequestPending = data;
        resolve(data);
      });
    });
    Promise.all([promise1, promise2]).then((_) => {
      this.dataRequestPending = this.dataRequestPending.filter(
        (element: any) => {
          if (element.id.toString() === this.idInsumo) {
            return element;
          }
        }
      );
      this.closeRequestButtonArray = this.dataRequestPending[0].suppliesRequested.filter(
        (item: any) => {
          if (item.state.id === 1 || item.state.id === 5) {
            return item.state;
          }
        }
      );
      if (
        this.dataRequestPending[0].suppliesRequested.length ===
        this.closeRequestButtonArray.length
      ) {
        this.closeRequestButton = false;
      }
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.dataRequestPending.length; index++) {
        // tslint:disable-next-line:prefer-for-of
        for (
          let index2 = 0;
          index2 < this.dataRequestPending[index].suppliesRequested.length;
          index2++
        ) {
          this.dataRequestPending[index].suppliesRequested[
            index2
          ].type = this.clone(this.type);
          this.dataRequestPending[index].suppliesRequested[
            index2
          ].button = this.clone(this.button);
          this.dataRequestPending[index].suppliesRequested[
            index2
          ].preview = false;
          // tslint:disable-next-line:prefer-for-of
          for (
            let index3 = 0;
            index3 <
            this.dataRequestPending[index].suppliesRequested[index2].typeSupply
              .extensions.length;
            index3++
          ) {
            this.dataRequestPending[index].suppliesRequested[
              index2
            ].format = this.dataRequestPending[index].suppliesRequested[
              index2
            ].typeSupply.extensions
              .map(
                // tslint:disable-next-line:only-arrow-functions
                function (elem: any) {
                  return '.' + elem.name;
                }
              )
              .join(',');
            this.dataRequestPending[index].suppliesRequested[index2].format =
              this.dataRequestPending[index].suppliesRequested[index2].format +
              ',.zip';

            if (
              this.dataRequestPending[index].suppliesRequested[index2]
                .typeSupply.extensions[index3].name === 'xtf'
            ) {
              this.dataRequestPending[index].suppliesRequested[
                index2
              ].xtf = this.clone(this.xtf);
              this.dataRequestPending[index].suppliesRequested[index2].type = [
                {
                  name: 'Archivo',
                  file: 'file',
                },
                {
                  name: 'No disponible',
                  file: 'none',
                },
              ];
            }

            if (
              this.dataRequestPending[index].suppliesRequested[index2].state
                .id === 1
            ) {
              this.dataRequestPending[index].suppliesRequested[
                index2
              ].preview = true;
            }
          }
        }
      }
      this.dataRequestPending[0].suppliesRequested = this.dataRequestPending[0].suppliesRequested.sort(
        (a, b) => a.id - b.id
      );
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  docSoport(files: FileList, idOut: number, idInt: number) {
    this.previewData = files;
    if (files[0].size / 1024 / 1024 <= environment.sizeFile) {
      let re = /zip*/;
      if (files[0].type.match(re)) {
        const formato = files[0].name.split('.').pop();
        let formatoPermitido = this.dataRequestPending[idOut].suppliesRequested[
          idInt
        ].format.split(',');
        formatoPermitido = formatoPermitido.map(
          // tslint:disable-next-line:only-arrow-functions
          function (elem: any) {
            return elem.substr(1);
          }
        );
        const archivoValido = formatoPermitido.filter((item) => {
          return item === formato;
        });

        if (archivoValido.length > 0) {
          this.dataRequestPending[idOut].suppliesRequested[idInt].file =
            files[0];
          this.validsendFile(idOut, idInt);
        } else {
          this.dataRequestPending[idOut].suppliesRequested[
            idInt
          ].button.status = true;
          this.toastr.error(
            'El formato no es valido, por favor subir en: ' +
              this.dataRequestPending[idOut].suppliesRequested[idInt].format
          );
        }
      } else {
        if (files[0].size / 1024 / 1024 > environment.sizeFileUnZip) {
          this.toastr.error(
            'Por favor convierta el archivo en .zip antes de subirlo, ya que supera el tamaño de cargue permitido.'
          );
          this.dataRequestPending[idOut].suppliesRequested[idInt].file = '';
          this.myInputVariable.nativeElement.value = '';
        } else {
          const formato = files[0].name.split('.').pop();
          let formatoPermitido = this.dataRequestPending[
            idOut
          ].suppliesRequested[idInt].format.split(',');
          formatoPermitido = formatoPermitido.map(
            // tslint:disable-next-line:only-arrow-functions
            function (elem: any) {
              return elem.substr(1);
            }
          );
          const archivoValido = formatoPermitido.filter((item) => {
            return item === formato;
          });
          if (archivoValido.length > 0) {
            this.dataRequestPending[idOut].suppliesRequested[idInt].file =
              files[0];
            this.validsendFile(idOut, idInt);
          } else {
            this.dataRequestPending[idOut].suppliesRequested[
              idInt
            ].button.status = true;
            this.toastr.error(
              'El formato no es valido, por favor subir en: ' +
                this.dataRequestPending[idOut].suppliesRequested[idInt].format
            );
          }
        }
      }
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].file = '';
      this.myInputVariable.nativeElement.value = '';
      this.toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }
  validsendFile(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].observations) {
      if (this.dataRequestPending[idOut].suppliesRequested[idInt].file) {
        this.dataRequestPending[idOut].suppliesRequested[
          idInt
        ].button.status = false;
      } else {
        this.toastr.error(
          'Por favor sube el archivo en alguno de los siguientes formatos: ' +
            this.dataRequestPending[idOut].suppliesRequested[idInt].format
        );
      }
    } else {
      this.toastr.info('La observación del archivo es obligatoria');
    }
  }
  intoValidURL(idOut: number, idInt: number) {
    // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    function validateUrl(value) {
      // tslint:disable-next-line:max-line-length
      return /^(?:(?:(?:https?|ftp?|ftps?|http?|ftpes?|sftp?|afp?|nfs?|smb?|ssh?|dav?|davs?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
      );
    }
    if (
      validateUrl(this.dataRequestPending[idOut].suppliesRequested[idInt].url)
    ) {
      if (
        this.dataRequestPending[idOut].suppliesRequested[idInt].observations
      ) {
        this.dataRequestPending[idOut].suppliesRequested[
          idInt
        ].button.status = false;
      } else {
        this.toastr.info('La observación es obligatoria');
      }
    } else {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].button.status = true;
      this.toastr.error('La URL no es correcta.');
    }
  }

  intoValidJustification(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].justification) {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].button.status = false;
    } else {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].button.status = true;
    }
  }
  send(idSolicitud: string, item: any, idOut: number, idInt: number) {
    item.preview = false;
    const form = new FormData();
    if (item.hasOwnProperty('typeSupply')) {
      form.append('typeSupplyId', item.typeSupply.id);
    }
    if (item.hasOwnProperty('file')) {
      form.append('files[]', item.file);
      form.append('observations', item.observations);
    }
    if (item.hasOwnProperty('justification')) {
      form.append('justification', item.justification);
    }
    if (item.hasOwnProperty('url')) {
      form.append('url', item.url);
      form.append('observations', item.observations);
    }
    if (item.typeSupply.id === 2 || item.typeSupply.id === 12) {
      form.append(
        'skipGeometryValidation',
        new Boolean(this.skipGeometryValidation).toString()
      );
    }
    this.serviceWorkspaces
      .loadSupplyFromRequest(idSolicitud, form)
      .subscribe((data: any) => {
        let response = data.suppliesRequested.find((item: any) => {
          return (
            item.id ==
            this.dataRequestPending[idOut].suppliesRequested[idInt].id
          );
        });
        response.canUpload = true;
        response.type = this.clone(this.type);
        response.button = this.clone(this.button);
        response.format = this.clone(
          this.dataRequestPending[idOut].suppliesRequested[
            idInt
          ].typeSupply.extensions
            .map(function (elem: any) {
              return '.' + elem.name;
            })
            .join(',')
        );
        response.format = response.format + ',.zip';
        for (
          let index3 = 0;
          index3 <
          this.dataRequestPending[idOut].suppliesRequested[idInt].typeSupply
            .extensions.length;
          index3++
        ) {
          if (
            this.dataRequestPending[idOut].suppliesRequested[idInt].typeSupply
              .extensions[index3].name === 'xtf'
          ) {
            response.xtf = this.clone(this.xtf);
            response.type = [
              {
                name: 'Archivo',
                file: 'file',
              },
              {
                name: 'No disponible',
                file: 'none',
              },
            ];
          }
        }
        this.dataRequestPending[idOut].suppliesRequested[idInt] = this.clone(
          response
        );
        for (let sr of this.dataRequestPending[idOut].suppliesRequested) {
          this.dataRequestPending[0].suppliesRequested[idInt].preview = true;
          this.fileUrl = this.dataRequestPending[0].suppliesRequested[
            idInt
          ].url;
        }
        this.closeRequestButtonArray = this.dataRequestPending[0].suppliesRequested.filter(
          (item: any) => {
            if (item.state.id === 1 || item.state.id === 5) {
              return item.state;
            }
          }
        );
        if (
          this.dataRequestPending[0].suppliesRequested.length ===
          this.closeRequestButtonArray.length
        ) {
          this.closeRequestButton = false;
        }
      });
  }
  closeRequest() {
    this.serviceWorkspaces
      .closeRequest(this.dataRequestPending[0].id)
      .subscribe((_) => {
        this.router.navigate(['/insumos/solicitudes/pendientes']);
      });
  }
  modelChanged(item: any, idOut: number, idInt: number) {
    delete this.dataRequestPending[idOut].suppliesRequested[idInt].observations;
    delete this.dataRequestPending[idOut].suppliesRequested[idInt].file;
    delete this.dataRequestPending[idOut].suppliesRequested[idInt].url;
    delete this.dataRequestPending[idOut].suppliesRequested[idInt]
      .justification;
    if (item.type.file === this.typeDataFieldModel.typeDataFile) {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].typeData = this.typeDataFieldModel.typeDataFile;
    }
    if (item.type.file === this.typeDataFieldModel.typeDataUrl) {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].typeData = this.typeDataFieldModel.typeDataUrl;
    }
    if (item.type.file === this.typeDataFieldModel.typeDataNone) {
      this.dataRequestPending[idOut].suppliesRequested[
        idInt
      ].typeData = this.typeDataFieldModel.typeDataNone;
    }
  }
  getEntity(item: any) {
    let data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
  volver() {
    this.router.navigate(['/insumos/solicitudes/pendientes']);
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModal(option: boolean) {
    if (option) {
      this.closeRequest();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  nameButton() {
    let data = this.dataRequestPending.find((element) => {
      return element.suppliesRequested.find((item) => {
        return item.typeSupply.id === 12;
      });
    });
    return data ? true : false;
  }
  openModalErrorXTF(modalError: any, supp: any) {
    this.errorXTF = supp.errors;
    this.modalService.open(modalError, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
  }
  openModalSkipValidated(modal: any): void {
    if (this.skipGeometryValidation) {
      this.modalService.open(modal, {
        centered: true,
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
      });
    }
  }
  closeModalSkipValidation(option: boolean) {
    this.modalService.dismissAll();
    this.skipGeometryValidation = false;
    if (option) {
      this.skipGeometryValidation = true;
    }
  }
  myFunctionCopyOrder() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.errorXTF;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
