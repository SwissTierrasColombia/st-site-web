import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-entregas-atendidas',
  templateUrl: './entregas-atendidas.component.html',
  styleUrls: ['./entregas-atendidas.component.scss']
})
export class EntregasAtendidasComponent implements OnInit {
  dataRequestPending: any;
  numEntregas: number;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router) {
    this.dataRequestPending = [];
    this.numEntregas = 0;
  }

  ngOnInit(): void {
    this.serviceWorkspaces.GetDeliveriesClosed().subscribe(
      response => {
        this.dataRequestPending = response;
        this.numEntregas = this.dataRequestPending.length;
      }
    )
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  load(IdEntrega: number) {
    this.router.navigate(['/operador/descarga/' + IdEntrega + '/realizada']);
  }

}
