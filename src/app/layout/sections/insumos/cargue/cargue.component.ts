import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'src/app/router.animations';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';
import { PocService } from 'src/app/services/poc/poc.service';

const moment = _moment;

@Component({
  selector: 'app-cargue',
  templateUrl: './cargue.component.html',
  styleUrls: ['./cargue.component.scss'],
  animations: [slideToLeft()]
})
export class CargueComponent implements OnInit {
  idInsumo: string;
  dataRequestPending: any;
  type: any;
  xtf: any;
  respuestaValidador: any;
  button: any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    public typeDataFieldModel: TypeDataSuppliesModel,
    private pocService: PocService

  ) {
    this.respuestaValidador = [
      {
        isValid: null
      }
    ];
    this.xtf = true;
    this.button = { status: true };
    this.idInsumo = '0';
    this.dataRequestPending = [];
    this.type = [
      {
        name: 'Archivo',
        file: 'file'
      },
      {
        name: 'URL',
        file: 'url'

      },
      {
        name: 'No disponible',
        file: 'none'
      }
    ];
  }
  ngOnInit() {
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe(
        response => {
          this.idInsumo = response.idInsumo;
          resolve(response);
        }
      );
    });
    const promise2 = new Promise((resolve) => {
      this.serviceWorkspaces.getPendingRequestByProvider().subscribe(
        data => {
          this.dataRequestPending = data;
          resolve(data);
        }
      );
    });
    Promise.all([promise1, promise2]).then(_ => {
      this.dataRequestPending = this.dataRequestPending.filter((element: any) => {
        if (element.id.toString() === this.idInsumo) {
          return element;
        }
      });
      console.log("hola 1: ", this.dataRequestPending);
      console.log("hola 2: ", this.dataRequestPending[0].suppliesRequested);

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.dataRequestPending.length; index++) {
        // tslint:disable-next-line:prefer-for-of
        for (let index2 = 0; index2 < this.dataRequestPending[index].suppliesRequested.length; index2++) {
          this.dataRequestPending[index].suppliesRequested[index2].type = this.clone(this.type);
          this.dataRequestPending[index].suppliesRequested[index2].button = this.clone(this.button);
          if (this.dataRequestPending[index].suppliesRequested[index2].delivered === false &&
            this.dataRequestPending[index].suppliesRequested[index2].justification !== null) {
            this.dataRequestPending[index].suppliesRequested[index2].delivered = true;
          }
          // tslint:disable-next-line:prefer-for-of
          for (let index3 = 0;
            index3 < this.dataRequestPending[index].suppliesRequested[index2].typeSupply.extensions.length;
            index3++) {
            this.dataRequestPending[index].suppliesRequested[index2].
              format = this.dataRequestPending[index].suppliesRequested[index2].typeSupply.extensions.map(
                // tslint:disable-next-line:only-arrow-functions
                function (elem: any) {
                  return '.' + elem.name;
                }).join(',');

            if (this.dataRequestPending[index].suppliesRequested[index2].typeSupply.extensions[index3].name === 'xtf') {
              this.dataRequestPending[index].suppliesRequested[index2].xtf = this.clone(this.xtf);
              this.dataRequestPending[index].suppliesRequested[index2].type = [{
                name: 'Archivo',
                file: 'file'
              },
              {
                name: 'No disponible',
                file: 'none'
              }];
            }
          }
        }
      }
    });
  }
  formatDate(date: string) {
    return moment(date).format('DD-MMM-YYYY hh:mm:ss');
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  docSoport(files: FileList, idOut: number, idInt: number) {
    const formato = files[0].name.split('.').pop();
    let formatoPermitido = this.dataRequestPending[idOut].suppliesRequested[idInt].format.split(',');
    formatoPermitido = formatoPermitido.map(
      // tslint:disable-next-line:only-arrow-functions
      function (elem: any) {
        return elem.substr(1);
      });
    const archivoValido = formatoPermitido.filter(item => {
      return item === formato;
    });

    if (archivoValido.length > 0) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].file = files[0];
      this.validsendFile(idOut, idInt);
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
      this.toastr.error('El formato no es valido, por favor subir en: ' + this.dataRequestPending[idOut].suppliesRequested[idInt].format);
    }
  }
  validsendFile(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].observations) {
      if (this.dataRequestPending[idOut].suppliesRequested[idInt].file) {
        this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
      } else {
        this.toastr.info('Por favor sube el archivo en alguno de los siguientes formatos: ' +
          this.dataRequestPending[idOut].suppliesRequested[idInt].format);
      }
    } else {
      this.toastr.info('La observación del archivo es obligatoria');
    }
  }
  intoValidURL(idOut: number, idInt: number) {
    // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    function validateUrl(value) {
      // tslint:disable-next-line:max-line-length
      return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }
    if (validateUrl(this.dataRequestPending[idOut].suppliesRequested[idInt].url)) {
      if (this.dataRequestPending[idOut].suppliesRequested[idInt].observations) {
        this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
      } else {
        this.toastr.info('La observación es obligatoria');
      }
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
      this.toastr.info('La URL no es correcta.');
    }
  }

  intoValidJustification(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].justification) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
    }
  }
  send(idSolicitud: string, item: any, idOut: number) {
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
    this.serviceWorkspaces.loadSupplyFromRequest(idSolicitud, form).subscribe(
      (data: any) => {
        this.ngOnInit();
        item.delivered = true;
      }
    );
  }
  closeRequest() {
    this.serviceWorkspaces.closeRequest(this.dataRequestPending[0].id).subscribe(
      data => {
        this.router.navigate(['/insumos/solicitudes/']);
      }
    );
  }
  modelChanged(item, idOut: number, idInt: number) {
    if (item.type.file === this.typeDataFieldModel.typeDataFile) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].typeData = this.typeDataFieldModel.typeDataFile;
    }
    if (item.type.file === this.typeDataFieldModel.typeDataUrl) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].typeData = this.typeDataFieldModel.typeDataUrl;
    }
    if (item.type.file === this.typeDataFieldModel.typeDataNone) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].typeData = this.typeDataFieldModel.typeDataNone;
    }
  }
}
