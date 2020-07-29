import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-revision-pendiente',
  templateUrl: './revision-pendiente.component.html',
  styleUrls: ['./revision-pendiente.component.scss']
})
export class RevisionPendienteComponent implements OnInit {
  totalPages: any;
  dataRecordsXTF: any;
  supplyRequestedId: number;
  size: number;
  page: number;
  totalElements: number;
  searchText: string;
  numDataRecords: number;
  document: any;
  currentPage: number;
  buttonActive: boolean;
  constructor(
    private serviceWorkspace: WorkspacesService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dataRecordsXTF = [];
    this.supplyRequestedId = 0;
    this.size = 20;
    this.page = 1;
    this.totalElements = 1000;
    this.currentPage = 1;
    this.totalPages = 1;
    this.buttonActive = false;
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(
      response => {
        this.supplyRequestedId = response.supplyRequestedId;
      }
    );
    this.serviceWorkspace.GetRecordsFromXTF(this.supplyRequestedId, this.currentPage).subscribe((response: any) => {
      this.totalPages = response.totalPages;
      this.dataRecordsXTF = response.records;
      console.log(this.dataRecordsXTF);
      let cont = 0;
      this.dataRecordsXTF.forEach(element => {
        if (element.fileId) {
          cont = cont + 1;
        }
      });
      this.numDataRecords = cont / this.totalElements;
      this.numDataRecords = Number(this.numDataRecords.toFixed(6));
    });
  }
  volver() {
    this.router.navigate(['/insumos/revisiones-pendientes']);
  }
  getPage(page: number) {
    this.serviceWorkspace.GetRecordsFromXTF(this.supplyRequestedId, page).subscribe((response: any) => {
      this.dataRecordsXTF = response.records;
      this.currentPage = page;
      let cont = 0;
      this.page = 1;
      this.dataRecordsXTF.forEach(element => {
        if (element.fileId) {
          cont = cont + 1;
        }
      });
      this.numDataRecords = cont / this.size;
      this.numDataRecords = Number(this.numDataRecords.toFixed(6));
    });
  }
  openModal(modal: any) {
    this.document = null;
    this.modalService.open(modal, { size: 'xl', scrollable: true, centered: true });
  }
  closeModal() {
    this.document = null;
    this.modalService.dismissAll();
  }
  docSoport(file: any) {
    if (file.length === 1) {
      if (file[0].size / 1024 / 1024 <= 190) {
        this.document = file[0];
        this.buttonActive = true;
      } else {
        this.document = null;
        this.buttonActive = false;
        this.toastr.error('No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.');
      }
    } else {
      this.document = null;
      this.buttonActive = false;
      this.toastr.error('Por favor seleccione solo un archivo PDF');
    }
  }
  sendSoport(item: any) {
    this.serviceWorkspace.UpdateRecordPDF(this.supplyRequestedId, item.boundaryId, this.document).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.buttonActive = false;
      item.fileId = 1;
      let cont = 0;
      this.dataRecordsXTF.forEach(element => {
        if (element.fileId) {
          cont = cont + 1;
        }
      });
      this.document = null;
      this.numDataRecords = cont / this.totalElements;
      this.numDataRecords = Number(this.numDataRecords.toFixed(6));
    }, error => {
      this.toastr.error('Por favor seleccione un archivo PDF');
    });
  }
  openModalCloseRecord(modal: any) {
    this.document = null;
    this.modalService.open(modal, { scrollable: true, centered: true });

  }
  closeRecords(option: boolean) {
    if (option) {
      this.serviceWorkspace.closeRevisionRecord(this.supplyRequestedId).subscribe((response: any) => {
        this.toastr.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/insumos/revisiones-pendientes']);
        }, 1000);
      });
    }
    this.document = null;
    this.modalService.dismissAll();
  }

}
