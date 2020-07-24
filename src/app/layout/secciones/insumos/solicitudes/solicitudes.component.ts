import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';

const moment = _moment;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  dataRequestPending: any;
  numSolicitudes: any;
  searchText: string;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router,

  ) {
    this.dataRequestPending = [];
    this.numSolicitudes = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.getPendingRequestByProvider().subscribe(
      data => {
        this.dataRequestPending = data;
        this.numSolicitudes = this.dataRequestPending.length;
      }
    );
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  load(idInsumo: number) {
    this.router.navigate(['/insumos/solicitudes/pendientes/cargar/' + idInsumo]);
  }
  getEntity(item: any) {
    const data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
}
