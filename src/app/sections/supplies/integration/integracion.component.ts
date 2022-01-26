import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SuppliesService } from 'src/app/services/supplies/supplies.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-integracion',
  templateUrl: './integracion.component.html',
  styleUrls: ['./integracion.component.scss'],
})
export class IntegracionComponent implements OnInit {
  departments: any;
  munucipalities: any;
  selectDepartment: string;
  selectMunicipality: number;
  dataWorkSpaceMunicipality: any;
  splitZones: boolean;
  dataSuppliesProvider: any;
  selectSupplies: number;
  listsupplies: { deadline: string; supplies: any };
  catastro: any;
  registro: any;
  ant: any;
  municipalityXTF: any;
  selectsupplyCadastre: number;
  selectsupplyRegistration: number;
  selectsupplyANT: number;
  msgAlert: string;
  mensajeIntegrationResponse: any;
  activateButtonIntegration: boolean;
  idWorkspace: number;
  integrationByWorkspace: any;
  selectIntegration: any;
  page: number;
  pageSize: number;
  msgIntegrationAssited: any;
  idGenerateXTF: number;
  idStartAsistente: number;
  idCancel: number;
  tab: number;
  SelectIntegrationPossible: any;
  municipalityCode: string;
  errorXTF: string;
  optionModalRef: NgbModalRef;
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private serviceWorkspaces: WorkspacesService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private scroll: ViewportScroller,
    private activedRoute: ActivatedRoute,
    private suppliesService: SuppliesService
  ) {
    this.departments = [];
    this.munucipalities = [];
    this.selectDepartment = '0';
    this.selectMunicipality = 0;
    this.splitZones = false;
    this.dataWorkSpaceMunicipality = {
      id: 0,
      manager: {
        name: '',
      },
      operators: [
        {
          operator: {
            name: '',
          },
        },
      ],
      numberAlphanumericParcels: '',
      municipalityArea: '',
    };
    this.dataSuppliesProvider = [];
    this.selectSupplies = 0;
    this.listsupplies = {
      deadline: '',
      supplies: [],
    };
    this.catastro = [];
    this.registro = [];
    this.ant = [];
    this.municipalityXTF = [];
    this.selectsupplyCadastre = 0;
    this.selectsupplyRegistration = 0;
    this.selectsupplyANT = 0;
    this.mensajeIntegrationResponse = {
      message: '',
    };
    this.msgAlert =
      '<strong>Recomendación: </strong>Por favor revisar los archivos antes de solicitar la integración.';
    this.activateButtonIntegration = true;
    this.idWorkspace = 0;
    this.integrationByWorkspace = [];
    this.selectIntegration = [
      {
        id: '',
        integrationState: {
          name: '',
          description: '',
        },
        supplyCadastre: {
          typeSupply: {
            name: '',
          },
        },
        supplySnr: { typeSupply: { name: '' } },
        stats: [
          {
            cadastreRecordsNumber: '',
            snrRecordsNumber: '',
            percentage: '',
            createdAt: '',
          },
        ],
      },
    ];
    this.page = 1;
    this.pageSize = 3;
    this.msgIntegrationAssited = [];
    this.idGenerateXTF = 0;
    this.idStartAsistente = 0;
    this.idCancel = 0;
    this.SelectIntegrationPossible = {};
    this.tab = 1;
    this.municipalityCode = '0';
    this.errorXTF = '';
  }

  ngOnInit() {
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe((response) => {
        this.SelectIntegrationPossible = response;
        if (this.SelectIntegrationPossible.tab) {
          this.tab = Number(this.SelectIntegrationPossible.tab);
        }
        resolve(response);
      });
    });
    const promise2 = new Promise((resolve) => {
      this.serviceWorkspaces.getDepartments().subscribe((response) => {
        this.departments = response;
        this.departments.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
        resolve(response);
      });
    });
    Promise.all([promise1, promise2]).then((values: any) => {
      if (this.SelectIntegrationPossible.municipio) {
        let idDepartamento = this.departments.find((item) => {
          return item.code === this.SelectIntegrationPossible.departamento;
        });
        this.selectDepartment = idDepartamento.id;
        this.changeDepartament();
      }
    });
  }
  changeDepartament() {
    this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(Number(this.selectDepartment))
      .subscribe((data) => {
        this.munucipalities = data;
        this.munucipalities.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
        if (this.SelectIntegrationPossible.municipio) {
          let idMunicipio = this.munucipalities.find((item) => {
            return item.code === this.SelectIntegrationPossible.municipio;
          });
          this.selectMunicipality = idMunicipio.id;
          this.changeMunucipality();
          this.tab = 3;
        }
      });
  }
  changeMunucipality() {
    this.serviceWorkspaces
      .getWorkSpaceActiveByMunicipality(this.selectMunicipality)
      .subscribe((response: any) => {
        this.dataWorkSpaceMunicipality = response;
        this.idWorkspace = this.dataWorkSpaceMunicipality.id;
        this.municipalityCode = response.municipality.code;
        this.serviceWorkspaces
          .GetIntegrationsByWorkspace(this.idWorkspace)
          .subscribe((resp) => {
            this.integrationByWorkspace = resp;
            let self = this;
            setTimeout(function () {
              self.scroll.scrollToAnchor('actionForm');
            }, 1000);
          });
        this.suppliesService
          .getSuppliesXTFbyMunicipality(this.municipalityCode)
          .subscribe((element) => {
            this.municipalityXTF = element;
            this.catastro = this.municipalityXTF.filter((item) => {
              if (item.typeSupplyCode === 2) {
                return item;
              }
            });
            this.registro = this.municipalityXTF.filter((item) => {
              if (item.typeSupplyCode === 12) {
                return item;
              }
            });
          });
      });
  }
  integrationSupplies() {
    // tslint:disable-next-line:prefer-const
    let data = {
      supplyCadastre: this.selectsupplyCadastre,
      supplyRegistration: this.selectsupplyRegistration,
    };
    this.serviceWorkspaces
      .GetIntegrationCadastreRegistration(this.selectMunicipality, data)
      .subscribe(
        (response) => {
          // tslint:disable-next-line:max-line-length
          this.msgAlert =
            '<strong>¡Se ha iniciado la integración!</strong><br>El sistema le enviará una notificación al correo una vez la finalice y podrá ver los resultados de integración en esta sección.';
          this.selectsupplyCadastre = 0;
          this.selectsupplyRegistration = 0;
          this.activateButtonIntegration = true;
          this.toastr.success('¡Se ha iniciado la integración!');
          setTimeout(() => {
            this.changeMunucipality();
          }, 2000);
        },
        (error) => {
          this.msgAlert =
            error.error.message +
            '<br>El sistema le enviará una notificación al correo una vez la finalice y podrá ver los resultados de integración en esta sección.';
          this.selectsupplyCadastre = 0;
          this.selectsupplyRegistration = 0;
          this.activateButtonIntegration = true;
        }
      );
  }
  comprobar(modalskipValidated?: any, item?: any) {
    if (modalskipValidated && item) {
      if (item.valid !== null && !item.valid) {
        this.modalService.open(modalskipValidated, {
          centered: true,
          scrollable: true,
          backdrop: 'static',
          keyboard: false,
        });
      }
    }
    if (
      this.selectsupplyCadastre !== 0 &&
      this.selectsupplyRegistration !== 0
    ) {
      this.activateButtonIntegration = false;
    }
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDateIntegration(date);
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  openModal(id: number, modal: any) {
    this.selectIntegration = this.integrationByWorkspace.filter((item) => {
      return item.id === id;
    });
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
  }
  openModalGenerateXTF(modal: any, idIntegration: number) {
    this.idGenerateXTF = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  openModalIntegrationAssited(modal: any, idIntegration: number) {
    this.idStartAsistente = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  openModalcancel(modal: any, idIntegration: number) {
    this.idCancel = idIntegration;
    this.modalService.open(modal, { centered: true, scrollable: true });
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
  generateXTF(idIntegration: number) {
    this.serviceWorkspaces
      .GenerateProductFromIntegration(this.idWorkspace, idIntegration)
      .subscribe((response) => {
        this.msgIntegrationAssited = response;
        this.toastr.success(
          this.msgIntegrationAssited.integrationState.description
        );
        setTimeout(() => {
          this.changeMunucipality();
        }, 2000);
      });
  }
  startIntegrationAssited(idIntegration: number) {
    this.serviceWorkspaces
      .StartIntegrationAssited(this.idWorkspace, idIntegration)
      .subscribe((response) => {
        this.msgIntegrationAssited = response;
        this.toastr.success(
          this.msgIntegrationAssited.integrationState.description
        );
        setTimeout(() => {
          this.changeMunucipality();
        }, 2000);
      });
  }
  cancel(idIntegration: number) {
    this.serviceWorkspaces
      .deleteIntegration(this.idWorkspace, idIntegration)
      .subscribe((_) => {
        this.toastr.success('Ha eliminado la integración');
        this.serviceWorkspaces
          .GetIntegrationsByWorkspace(this.idWorkspace)
          .subscribe((resp) => {
            this.integrationByWorkspace = resp;
            this.integrationByWorkspace.reverse();
          });
      });
  }
  roundDecimal(num: any) {
    return Math.round(num * 100) / 100;
  }
  parcelNumber(index: number) {
    return new Intl.NumberFormat().format(index);
  }
  openModalXTF(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalXTF(option: boolean) {
    if (option) {
      this.integrationSupplies();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  tab1() {
    this.tab = 1;
    this.router.navigate(['/insumos/integracion', { tab: 1 }]);
  }
  tab2() {
    this.tab = 2;
    this.router.navigate(['/insumos/integracion', { tab: 2 }]);
  }
  tab3() {
    this.tab = 3;
    this.router.navigate(['/insumos/integracion', { tab: 3 }]);
  }
  openModalErrorXTF(modalError: any, supp: any) {
    this.errorXTF = supp.errors;
    this.modalService.open(modalError, {
      centered: true,
      scrollable: true,
      size: 'lg',
    });
  }
  closeModalSkipValidation(option: boolean) {
    this.modalService.dismissAll();
    if (!option) {
      this.selectsupplyCadastre = 0;
    }
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
  generateMap(integrationId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de generar el mapa?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a generar el mapa del producto generado.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceWorkspaces
            .configureMap(integrationId)
            .subscribe((element) => {
              this.toastr.success('Se a generado el mapa correctamente.');
            });
        }
      }
    });
  }
}
