import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-deliveries-supplies',
  templateUrl: './deliveries-supplies.component.html',
  styleUrls: ['./deliveries-supplies.component.scss']
})
export class DeliveriesSuppliesComponent implements OnInit {
  dataRequestPending: any;

  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router
  ) {
    this.dataRequestPending = [];
  }

  ngOnInit() {
    this.serviceWorkspaces.GetDeliveriesToOperator().subscribe(
      response => {
        this.dataRequestPending = response;
      }
    );
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  load(IdEntrega: number) {
    this.router.navigate(['/operador/entrega/' + IdEntrega + '/descargar']);
  }

}
