import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { slideToLeft } from 'src/app/router.animations';

const moment = _moment;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  animations: [slideToLeft()]
})
export class SolicitudesComponent implements OnInit {
  dataRequestPending: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private router: Router,

  ) {
    this.dataRequestPending = [];
  }

  ngOnInit() {
    this.serviceWorkspaces.getPendingRequestByProvider().subscribe(
      data => {
        this.dataRequestPending = data;
      }
    );
  }
  formatDate(date: string) {
    return moment(date).format('DD-MMM-YYYY h:mm:ss');
  }
  load(idInsumo: number) {
    this.router.navigate(['/insumos/cargue/' + idInsumo]);
  }
}
