import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideToLeft } from 'src/app/router.animations';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { saveAs } from 'file-saver';
import { ModalService } from 'src/app/services/modal/modal.service';

const moment = _moment;
@Component({
  selector: 'app-download-supplies',
  templateUrl: './download-supplies.component.html',
  styleUrls: ['./download-supplies.component.scss'],
  animations: [slideToLeft()]

})
export class DownloadSuppliesComponent implements OnInit {

  IdEntrega: number;
  dataRequestPending: any;
  supplies: any;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private modalService: ModalService
  ) {
    this.IdEntrega = 0;
    this.dataRequestPending = [];
    this.supplies = [];
  }

  ngOnInit() {
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
    });
  }
  reload() {
    this.serviceWorkspaces.GetDeliveriesToOperator().subscribe(
      response => {
        this.dataRequestPending = response;
        this.dataRequestPending = this.dataRequestPending.filter((element: any) => {
          if (element.id.toString() === this.IdEntrega) {
            return element;
          }
          this.supplies = this.dataRequestPending[0].supplies;
        });
      }
    );
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  downloadSupplies(idSupplie: number, nameSupplie: string) {
    const promise1 = new Promise((resolve) => {
      this.serviceWorkspaces.downloadSupplie(idSupplie).subscribe(
        (data: any) => {
          const contentType = data.headers.get('content-type');
          const type = contentType.split(',')[0];
          //const ext = data.headers.get('Content-Disposition');
          const dataFile = data.body;
          const blob = new Blob([dataFile], { type });
          const url = window.URL.createObjectURL(blob);
          saveAs(blob, nameSupplie + '.zip');
        }
      );
    });
    Promise.all([promise1]).then(_ => {
      this.reload()
    });
  }
  closeModal(option: boolean, modal: string) {
    if (option) {
      this.closeDelivery(this.IdEntrega);
    } else {
      this.modalService.close(modal);
    }
  }
  openModal(modal: string) {
    this.modalService.open(modal);
  }
  closeDelivery(idDelivery) {
    this.serviceWorkspaces.CloseDelivery(idDelivery).subscribe(
      _ => {
        this.router.navigate(['/operador/entregas/']);
      }
    );
  }
}
