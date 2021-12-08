import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';

const moment = _moment;

@Component({
  selector: 'app-atendida',
  templateUrl: './atendida.component.html',
  styleUrls: ['./atendida.component.scss'],
})
export class AtendidaComponent implements OnInit {
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
  suppliesRequested: any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    public typeDataFieldModel: TypeDataSuppliesModel
  ) {
    this.idInsumo = '0';
    this.dataRequestPending = [];
    this.suppliesRequested = [];
  }
  ngOnInit() {
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe((response) => {
        this.idInsumo = response.idInsumo;
        resolve(response);
      });
    });
    const promise2 = new Promise((resolve) => {
      this.serviceWorkspaces
        .getAttendedRequestByProvider()
        .subscribe((data) => {
          this.dataRequestPending = data;
          resolve(data);
        });
    });
    Promise.all([promise1, promise2]).then((_) => {
      // this.dataRequestPending = this.dataRequestPending.filter(
      //   (element: any) => {
      //     if (element.id.toString() === this.idInsumo) {
      //       return element;
      //     }
      //   }
      // );
      this.suppliesRequested = this.clone(
        this.dataRequestPending[0].suppliesRequested
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

  getEntity(item: any) {
    let data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
  volver() {
    this.router.navigate(['/insumos/solicitudes/atendidas']);
  }
}
