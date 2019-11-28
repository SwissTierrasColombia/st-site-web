import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'src/app/router.animations';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';

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
  success: any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    public typeDataFieldModel: TypeDataSuppliesModel

  ) {
    this.success = {
      status: false
    };
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
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.dataRequestPending.length; index++) {
        // tslint:disable-next-line:prefer-for-of
        for (let index2 = 0; index2 < this.dataRequestPending[index].suppliesRequested.length; index2++) {
          this.dataRequestPending[index].suppliesRequested[index2].type = this.type;
          this.dataRequestPending[index].suppliesRequested[index2].success = this.clone(this.success);
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
    this.dataRequestPending[idOut].suppliesRequested[idInt].file = files[0];
  }
  send(item: any) {
    console.log(item);
    const form = new FormData();
    form.append('files[]', item.file);
    form.append('typeSupplyId', item.id);
    form.append('justification', item.justification);
    form.append('url', item.url);
    item.success.status = true;
  }
  closeRequest() {

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
