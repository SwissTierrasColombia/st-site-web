import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { saveAs } from 'file-saver';

const moment = _moment;
@Component({
  selector: 'app-delivery-manager',
  templateUrl: './delivery-manager.component.html',
  styleUrls: ['./delivery-manager.component.scss'],
})
export class DeliveryManagerComponent implements OnInit {
  dataRequestPending: any;
  supplies: any;
  deliveryId: number;
  isAllDownloadReports: boolean;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService
  ) {
    this.dataRequestPending = {
      manager: {
        name: '',
        alias: '',
      },
      municipality: {
        name: '',
      },
      supplies: [],
    };
    this.supplies = [];
    this.deliveryId = 0;
    this.isAllDownloadReports = false;
  }
  ngOnInit(): void {
    this.activedRoute.params.subscribe((response) => {
      this.deliveryId = response.deliveryId;
      this.serviceWorkspaces
        .getDeliveryByIdFromManager(this.deliveryId)
        .subscribe((data) => {
          this.dataRequestPending = data;
          this.supplies = this.dataRequestPending.supplies;
          console.log(this.supplies);

          const isDownloadGeneralReport = this.supplies.filter((item) => {
            return item.downloaded === true;
          });
          if (isDownloadGeneralReport.length === this.supplies.length) {
            this.isAllDownloadReports = true;
          } else {
            this.isAllDownloadReports = false;
          }
        });
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  volver() {
    this.router.navigate(['/insumos/entregas-realizadas']);
  }
  downloadGeneralReport() {
    this.serviceWorkspaces
      .generateReportDeliveryFromManager(this.deliveryId)
      .subscribe((data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const name = data.headers.get('filename');
        // const ext = data.headers.get('extension');
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'reporte_entrega.pdf');
      });
  }
  isAuthority(item: any) {
    const owner = item.supply.owners.find((data) => {
      return data.ownerType === 'CADASTRAL_AUTHORITY';
    });
    return owner ? true : false;
  }
}
