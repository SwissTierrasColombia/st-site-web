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
          // console.log("this.dataRequestPending", this.dataRequestPending);
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
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.dataRequestPending.length; index++) {
        // tslint:disable-next-line:prefer-for-of
        for (let index2 = 0; index2 < this.dataRequestPending[index].suppliesRequested.length; index2++) {
          this.dataRequestPending[index].suppliesRequested[index2].type = this.clone(this.type);
          this.dataRequestPending[index].suppliesRequested[index2].button = this.clone(this.button);
          if (this.dataRequestPending[index].suppliesRequested[index2].delivered === false &&
            this.dataRequestPending[index].suppliesRequested[index2].justification !== null) {
            // console.log("hola", this.dataRequestPending[index].suppliesRequested[index2]);
            this.dataRequestPending[index].suppliesRequested[index2].delivered = true;
          }
          // tslint:disable-next-line:prefer-for-of
          for (let index3 = 0;
            index3 < this.dataRequestPending[index].suppliesRequested[index2].typeSupply.extensions.length;
            index3++) {
            console.log(this.dataRequestPending[index].suppliesRequested[index2].typeSupply.extensions);

            this.dataRequestPending[index].suppliesRequested[index2].
              format = this.clone(this.dataRequestPending[index].
                suppliesRequested[index2].typeSupply.extensions[index3].name);

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
    return moment(date).format('DD-MMM-YYYY h:mm:ss');
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  docSoport(files: FileList, idOut: number, idInt: number) {
    const formato = files[0].name.split('.').pop()
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].format === formato) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].file = files[0];
      console.log(this.dataRequestPending[idOut].suppliesRequested[idInt].file);

      if (this.dataRequestPending[idOut].suppliesRequested[idInt].xtf) {
        // const response = this.validarXTF(idOut, idInt);
        // if (response[0].isValid) {
        //   this.toastr.success('archivo XTF valido');
        //   this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
        // } else {
        //   this.toastr.error('archivo XTF invalido');
        //   this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
        // }
      } else {
        this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
        console.log(this.dataRequestPending[idOut].suppliesRequested[idInt]);
      }
    } else {
      this.toastr.error('El formato no es valido, por favor subir en: ' + this.dataRequestPending[idOut].suppliesRequested[idInt].format);
    }
  }
  intoValidURL(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].url) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
    }
  }
  intoValidJustification(idOut: number, idInt: number) {
    if (this.dataRequestPending[idOut].suppliesRequested[idInt].justification) {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
    } else {
      this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
    }
  }
  send(idSolicitud: string, item: any) {
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
      data => {
        item.delivered = true;
      }
    );
  }
  closeRequest() {
    // console.log(this.dataRequestPending);
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
  validarXTF(idOut: number, idInt: number) {
    this.pocService.postFileImagen(this.dataRequestPending[idOut].suppliesRequested[idInt].file).subscribe(
      (response: any) => {
        this.respuestaValidador = response;
        if (response[0].isValid) {
          this.toastr.success('archivo XTF valido');
          this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = false;
        } else {
          this.toastr.error('archivo XTF invalido');
          this.dataRequestPending[idOut].suppliesRequested[idInt].button.status = true;
        }
        return this.respuestaValidador;
      }

    ); // FIN DE METODO SUBSCRIBE
  }

}
