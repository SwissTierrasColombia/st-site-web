import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-integrations-running',
  templateUrl: './integrations-running.component.html',
  styleUrls: ['./integrations-running.component.scss'],
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
  errorXTF: string;

  constructor(
    private router: Router,
    private serviceWorkspace: WorkspacesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dataIntegration = [];
    this.selectIntegration = [];
    this.idGenerateXTF = 0;
    this.idStartAsistente = 0;
    this.idCancel = 0;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.errorXTF = '';
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetIntegrationRunning().subscribe((data) => {
      this.dataIntegration = data;
      this.dataIntegration.sort(function (a: any, b: any) {
        if (
          a.municipalityDto.department.name > b.municipalityDto.department.name
        ) {
          return 1;
        }
        if (
          a.municipalityDto.department.name < b.municipalityDto.department.name
        ) {
          return -1;
        }
        //a must be equal to b
        return 0;
      });
    });
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDateIntegration(date);
  }

  parcelNumber(num: number) {
    return new Intl.NumberFormat().format(num);
  }
  roundDecimal(num: any) {
    return Math.round(num * 100) / 100;
  }
  changeState(selectMunicipality: number) {
    this.serviceWorkspace
      .getWorkSpaceActiveByMunicipality(selectMunicipality)
      .subscribe((response) => {
        this.dataWorkSpaceMunicipality = response;
        this.idWorkspace = this.dataWorkSpaceMunicipality.id;
      });
  }
  generateXTF(idIntegration: number) {
    this.serviceWorkspace
      .GenerateProductFromIntegration(this.idWorkspace, idIntegration)
      .subscribe((response) => {
        this.msgIntegrationAssited = response;
        this.toastr.success(
          this.msgIntegrationAssited.integrationState.description
        );
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      });
  }
  startIntegrationAssited(idIntegration: number) {
    this.serviceWorkspace
      .StartIntegrationAssited(this.idWorkspace, idIntegration)
      .subscribe((response) => {
        this.msgIntegrationAssited = response;
        this.toastr.success(
          this.msgIntegrationAssited.integrationState.description
        );
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      });
  }
  cancel(idIntegration: number) {
    this.serviceWorkspace
      .deleteIntegration(this.idWorkspace, idIntegration)
      .subscribe((_) => {
        this.toastr.success('Ha eliminado la integración');
        this.serviceWorkspace
          .GetIntegrationsByWorkspace(this.idWorkspace)
          .subscribe((resp) => {
            this.integrationByWorkspace = resp;
            this.integrationByWorkspace.reverse();
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          });
      });
  }
  closeModal(id: string) {
    this.modalService.dismissAll();
  }
  openModal(item: any, modal: any) {
    this.selectIntegration = item;
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
  }
  openModalGenerateXTF(modal: any, idIntegration: number, item: any) {
    this.idGenerateXTF = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);
  }
  openModalIntegrationAssited(modal: any, idIntegration: number, item: any) {
    this.idStartAsistente = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);
  }
  openModalcancel(modal: any, idIntegration: number, item: any) {
    this.idCancel = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.selectMunicipality = item.municipalityDto.id;
    this.changeState(this.selectMunicipality);
  }
  closeModalGenerateXTF(option: boolean) {
    if (option) {
      this.generateXTF(this.idGenerateXTF);
    }
    this.modalService.dismissAll();
  }
  closeModalIntegrationAssited(option: boolean) {
    if (option) {
      this.startIntegrationAssited(this.idStartAsistente);
    }
    this.modalService.dismissAll();
  }
  closeModalcancel(option: boolean) {
    if (option) {
      this.cancel(this.idCancel);
    }
    this.modalService.dismissAll();
  }
  openModalErrorXTF(modalError: any, supp: any) {
    this.errorXTF = supp.errors;
    this.modalService.open(modalError, { centered: true, scrollable: true });
  }
  myFunctionCopyOrder() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.errorXTF;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
