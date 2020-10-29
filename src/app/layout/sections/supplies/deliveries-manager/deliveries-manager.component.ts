import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import * as _moment from 'moment';

const moment = _moment;
@Component({
  selector: 'app-deliveries-manager',
  templateUrl: './deliveries-manager.component.html',
  styleUrls: ['./deliveries-manager.component.scss'],
})
export class DeliveriesManagerComponent implements OnInit {
  dataRequestPending: any;
  numEntregas: number;

  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router
  ) {
    this.dataRequestPending = [];
    this.numEntregas = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.getDeliveriesByManager().subscribe((response) => {
      this.dataRequestPending = response;
      this.numEntregas = this.dataRequestPending.length;
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('Do MMM YYYY');
  }
  load(deliveryId: number) {
    this.router.navigate(['/insumos/entregas-realizadas/' + deliveryId]);
  }
}
