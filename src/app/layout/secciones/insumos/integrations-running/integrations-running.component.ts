import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-integrations-running',
  templateUrl: './integrations-running.component.html',
  styleUrls: ['./integrations-running.component.scss']
})
export class IntegrationsRunningComponent implements OnInit {

  dataIntegration: any;
  selectIntegration: any;
  searchText: string;
  idGenerateXTF: number;
  idStartAsistente: number;
  idCancel: number;
  msgIntegrationAssited: any;
  selectMunicipality: number;
  dataWorkSpaceMunicipality: any;
  idWorkspace: any;
  providers: any;
  integrationByWorkspace: any;
  municipalityXTF: any;
  catastro: any;
  registro: any;
  ant: any;

  constructor(
    private router: Router,
    private serviceWorkspace: WorkspacesService,
    private modalService: ModalService,
    private toastr: ToastrService
  ) {
    this.dataIntegration = [];
    this.selectIntegration = [];
    this.idGenerateXTF = 0;
    this.idStartAsistente = 0;
    this.idCancel = 0;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetIntegrationRunning().subscribe(
      data => {
        this.dataIntegration = data;
      }
    );
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  parcelNumber(number: number) {
    return new Intl.NumberFormat().format(number);
  }
  roundDecimal(num: any) {
    return Math.round(num * 100) / 100;
  }
  changeState(selectMunicipality: number) {
    this.serviceWorkspace.getWorkSpaceActiveByMunicipality(selectMunicipality).subscribe(
      response => {
        this.dataWorkSpaceMunicipality = response;
        this.idWorkspace = this.dataWorkSpaceMunicipality.id;
      }
    );
  }
  generateXTF(idIntegration: number) {
    this.serviceWorkspace.GenerateProductFromIntegration(this.idWorkspace, idIntegration).subscribe(
      response => {
        this.msgIntegrationAssited = response;
        this.toastr.success(this.msgIntegrationAssited.integrationState.description);
        setTimeout(function () {
          window.location.reload();
        }, 1000);

      });
  }
  startIntegrationAssited(idIntegration: number) {
    this.serviceWorkspace.StartIntegrationAssited(this.idWorkspace, idIntegration).subscribe(
      response => {
        this.msgIntegrationAssited = response;
        this.toastr.success(this.msgIntegrationAssited.integrationState.description);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      });
  }
  cancel(idIntegration: number) {
    this.serviceWorkspace.deleteIntegration(this.idWorkspace, idIntegration).subscribe(
      _ => {
        this.toastr.success('Ha eliminado la integración');
        this.serviceWorkspace.GetIntegrationsByWorkspace(this.idWorkspace).subscribe(
          resp => {
            this.integrationByWorkspace = resp;
            this.integrationByWorkspace.reverse();
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        );
      }
    );
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(item: any, modal: string) {
    this.selectIntegration = item;
    this.modalService.open(modal);
  }
  openModalGenerateXTF(modal: string, idIntegration: number, item: any) {
    this.idGenerateXTF = idIntegration;
    this.modalService.open(modal);
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);

  }
  openModalIntegrationAssited(modal: string, idIntegration: number, item: any) {
    this.idStartAsistente = idIntegration;
    this.modalService.open(modal);
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);
  }
  openModalcancel(modal: string, idIntegration: number, item: any) {
    this.idCancel = idIntegration;
    this.modalService.open(modal);
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);
  }
  closeModalGenerateXTF(modal: string, option: boolean) {
    if (option) {
      this.generateXTF(this.idGenerateXTF);
    }
    this.modalService.close(modal);
  }
  closeModalIntegrationAssited(modal: string, option: boolean) {
    if (option) {
      this.startIntegrationAssited(this.idStartAsistente);
    }
    this.modalService.close(modal);
  }
  closeModalcancel(modal: string, option: boolean) {
    if (option) {
      this.cancel(this.idCancel);
    }
    this.modalService.close(modal);
  }
}
