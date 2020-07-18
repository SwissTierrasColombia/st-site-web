import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const moment = _moment;

@Component({
  selector: 'app-revisiones-pendientes',
  templateUrl: './revisiones-pendientes.component.html',
  styleUrls: ['./revisiones-pendientes.component.scss']
})
export class RevisionesPendientesComponent implements OnInit {
  data: any;
  searchText: string;
  numSolicitudes: number;
  constructor(
    private serviceWorkspace: WorkspacesService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal

  ) {
    this.data = [];
    this.numSolicitudes = 0;
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetSuppliesRequestedToReview().subscribe(response => {
      this.data = response;
      this.numSolicitudes = this.data.length;
      console.log(this.data);
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  getEntity(item: any) {
    const data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
  startRevision(supplyRequestedId: number) {
    this.serviceWorkspace.StartRevision(supplyRequestedId).subscribe(
      (item: any) => {
        this.toastr.success(item.message);
        this.serviceWorkspace.GetSuppliesRequestedToReview().subscribe(response => {
          this.data = response;
          this.numSolicitudes = this.data.length;
          console.log(this.data);
        });
      }
    );
  }
  viewRecords(supplyRequestedId: number) {
    this.router.navigate(['/insumos/revisiones-pendientes/registros/' + supplyRequestedId]);
  }
  openModal(modal: any) {
    this.modalService.open(modal, { scrollable: true, centered: true });

  }
  closeModal(supplyRequestedId: number, option: boolean) {
    if (option) {
      this.startRevision(supplyRequestedId);
    }
    this.modalService.dismissAll();
  }

}
