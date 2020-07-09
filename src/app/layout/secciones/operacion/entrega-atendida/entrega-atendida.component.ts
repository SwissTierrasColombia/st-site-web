import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import * as _moment from 'moment';
import { saveAs } from 'file-saver';

const moment = _moment;
@Component({
  selector: 'app-entrega-atendida',
  templateUrl: './entrega-atendida.component.html',
  styleUrls: ['./entrega-atendida.component.scss']
})
export class EntregaAtendidaComponent implements OnInit {

  IdEntrega: number;
  dataRequestPending: any;
  supplies: any;
  isAllDownloadReports: boolean;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private modalService: ModalService
  ) {
    this.IdEntrega = 0;
    this.dataRequestPending = [];
    this.supplies = [];
    this.isAllDownloadReports = false;
  }
  ngOnInit(): void {
    this.funtionInit();
  }
  funtionInit() {
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe(
        response => {
          this.IdEntrega = response.IdEntrega;
          resolve(response);
        }
      );
    });
    const promise2 = new Promise((resolve) => {
      this.serviceWorkspaces.GetDeliveriesClosed().subscribe(
        response => {
          this.dataRequestPending = response;
          resolve(response)
        }
      );
    });
    Promise.all([promise1, promise2]).then(_ => {
      this.dataRequestPending = this.dataRequestPending.filter((element: any) => {
        if (element.id.toString() === this.IdEntrega) {
          return element;
        }
      });
      this.supplies = this.dataRequestPending[0].supplies;
      let isDownloadGeneralReport = this.supplies.filter(item => {
        return item.downloaded === true
      });
      if (isDownloadGeneralReport.length == this.supplies.length) {
        this.isAllDownloadReports = true;
      } else {
        this.isAllDownloadReports = false;
      }
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  volver() {
    this.router.navigate(['/operador/descargas-realizadas/']);
  }
  downloadGeneralReport(nameSupplie: string) {
    this.serviceWorkspaces.DownloadReportGeneral(this.IdEntrega).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        //const ext = data.headers.get('Content-Disposition');
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, nameSupplie + '.pdf');
        this.funtionInit();
      }
    );
  }

}
