import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const moment = _moment;
@Component({
  selector: 'app-download-supplies',
  templateUrl: './download-supplies.component.html',
  styleUrls: ['./download-supplies.component.scss']
})
export class DownloadSuppliesComponent implements OnInit {

  IdEntrega: number;
  dataRequestPending: any;
  supplies: any;
  isAllDownloadReports: boolean;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private modalService: NgbModal
  ) {
    this.IdEntrega = 0;
    this.dataRequestPending = [];
    this.supplies = [];
    this.isAllDownloadReports = false;
  }

  ngOnInit() {
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
      this.serviceWorkspaces.GetDeliveriesToOperator().subscribe(
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
  // reload() {
  //   this.serviceWorkspaces.GetDeliveriesToOperator().subscribe(
  //     response => {
  //       this.dataRequestPending = response;
  //       this.dataRequestPending = this.dataRequestPending.filter((element: any) => {
  //         if (element.id.toString() === this.IdEntrega) {
  //           return element;
  //         }
  //         this.supplies = this.dataRequestPending[0].supplies;
  //       });
  //     }
  //   );
  // }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  downloadSupplies(idSupplie: number, nameSupplie: string) {
    this.serviceWorkspaces.downloadSupplie(idSupplie).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        //const ext = data.headers.get('Content-Disposition');
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, nameSupplie + '.zip');
        this.funtionInit();
      }
    );
  }
  closeModal(option: boolean) {
    if (option) {
      this.closeDelivery(this.IdEntrega);
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeDelivery(idDelivery) {
    this.serviceWorkspaces.CloseDelivery(idDelivery).subscribe(
      _ => {
        this.router.navigate(['/operador/descargas/']);
      }
    );
  }
  volver() {
    this.router.navigate(['/operador/descargas/']);
  }
  downloadReport(idSupplie: string, nameSupplie: string) {
    this.serviceWorkspaces.DownloadReportIndividual(this.IdEntrega, idSupplie).subscribe(
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
  isAuthority(item: any) {
    let owner = item.supply.owners.find(data => {
      return data.ownerType === 'CADASTRAL_AUTHORITY';
    });
    return owner ? true : false;
  }
}
