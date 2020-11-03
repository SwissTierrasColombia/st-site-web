import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';

const moment = _moment;

@Component({
  selector: 'app-solicitudes-atendidas',
  templateUrl: './solicitudes-atendidas.component.html',
  styleUrls: ['./solicitudes-atendidas.component.scss'],
})
export class SolicitudesAtendidasComponent implements OnInit {
  dataRequestPending: any;
  numSolicitudes: number;
  searchText: string;

  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router
  ) {
    this.dataRequestPending = [];
    this.numSolicitudes = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.getAttendedRequestByProvider().subscribe((data) => {
      this.dataRequestPending = data;
      this.numSolicitudes = this.dataRequestPending.length;
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  load(idInsumo: number) {
    this.router.navigate(['/insumos/solicitudes/atendidas/ver/' + idInsumo]);
  }
  getEntity(item: any) {
    let data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
}
