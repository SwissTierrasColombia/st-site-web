import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

const moment = _moment;
const subModel = '3.0';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {
  docsSoport: File;
  departments: any;
  selectDepartment: number;
  splitZones: boolean;
  municipalities: any;
  selectMunicipality: number;
  dataWorkSpaceMunicipality: any;
  providers: any;
  selectProvider: any;
  dataSuppliesProvider: any;
  selectSupplies: any;
  observations: string;
  listsupplies: any;
  tablesupplies: any;
  count: number;
  selectModelSupplies: string;
  tableSolicitudes: any;
  currentDate: any;
  tab: number;
  dataOrder: any;
  petitionsForManager: any;
  providerIdPetition: string;
  isActiveButtonAdd: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.count = 1;
    this.observations = '';
    this.departments = [];
    this.municipalities = [];
    this.selectDepartment = 0;
    this.selectMunicipality = 0;
    this.selectProvider = 0;
    this.splitZones = false;
    this.dataWorkSpaceMunicipality = {
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
    };
    this.providers = [];
    this.dataSuppliesProvider = [];
    this.selectSupplies = 0;
    this.listsupplies = {
      deadline: '',
      supplies: [],
    };
    this.tablesupplies = [];
    this.selectModelSupplies = '0';
    this.tableSolicitudes = [];
    this.tab = 1;
    this.dataOrder = [];
    this.petitionsForManager = [];
    this.providerIdPetition = '0';
    this.isActiveButtonAdd = false;
  }
  ngOnInit() {
    this.activedRoute.params.subscribe((response) => {
      if (response.tab) {
        this.tab = Number(response.tab);
        if (this.tab === 3) {
          this.serviceProviders.getProviders().subscribe((element) => {
            this.providers = element;
          });
          this.changeStateGetPetition();
        }
      }
    });
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 16);
    this.listsupplies.deadline = this.currentDate
      .toISOString()
      .substring(0, 10);
    this.currentDate = this.clone(this.listsupplies.deadline);
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
    });
  }
  change() {
    this.isActiveButtonAdd = false;
    if (this.selectProvider != 0 && this.observations != '') {
      this.isActiveButtonAdd = true;
    }
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeDepartament() {
    this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(this.selectDepartment)
      .subscribe((data) => {
        this.municipalities = data;
        this.municipalities.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      });
  }
  changeMunucipality() {
    this.serviceWorkspaces
      .getWorkSpaceActiveByMunicipality(this.selectMunicipality)
      .subscribe((response) => {
        this.dataWorkSpaceMunicipality = response;
        this.serviceProviders.getProvidersActive().subscribe((data) => {
          this.providers = data;
        });
      });
  }
  changeMunucipalityReload() {
    this.serviceWorkspaces
      .getWorkSpaceActiveByMunicipality(this.selectMunicipality)
      .subscribe((response) => {
        this.dataWorkSpaceMunicipality = response;
        this.serviceProviders.getProvidersActive().subscribe((data) => {
          this.providers = data;
        });
      });
  }
  changeProvider() {
    this.serviceProviders
      .getTypeSuppliesByProvider(this.selectProvider.id.toString())
      .subscribe((response) => {
        this.dataSuppliesProvider = response;
        this.change();
      });
  }
  agregar() {
    if (this.selectSupplies.id) {
      if (this.observations) {
        const exist = this.tablesupplies.find((item) => {
          return item.idInsumo === this.selectSupplies.id;
        });
        if (exist === undefined) {
          if (this.selectSupplies.modelRequired) {
            this.listsupplies.supplies.push({
              idCount: this.count,
              idInsumo: this.selectSupplies.id,
              observation: this.observations,
              providerId: this.selectProvider.id,
              typeSupplyId: this.selectSupplies.id,
              modelVersion: subModel,
            });
            this.tablesupplies.push({
              idCount: this.count,
              idEntidad: this.selectProvider.id,
              entidad: this.selectProvider.name,
              idInsumo: this.selectSupplies.id,
              insumo: this.selectSupplies.name,
              observacion: this.observations,
              modelRequired: true,
              modelVersion: subModel,
              perfil: this.selectSupplies.providerProfile.name,
            });
            this.count += 1;
            this.selectSupplies = 0;
            this.observations = '';
          } else {
            this.listsupplies.supplies.push({
              idCount: this.count,
              idInsumo: this.selectSupplies.id,
              observation: this.observations,
              providerId: this.selectProvider.id,
              typeSupplyId: this.selectSupplies.id,
            });
            this.tablesupplies.push({
              idCount: this.count,
              idEntidad: this.selectProvider.id,
              entidad: this.selectProvider.name,
              idInsumo: this.selectSupplies.id,
              insumo: this.selectSupplies.name,
              observacion: this.observations,
              perfil: this.selectSupplies.providerProfile.name,
            });
            this.count += 1;
            this.selectSupplies = 0;
            this.observations = '';
          }
        } else {
          this.toastr.show(
            'Ya ha solicitado el insumo.',
            this.selectSupplies.name
          );
        }
      } else {
        this.toastr.error('Las observaciones son obligatorias.');
      }
    } else {
      this.toastr.error('No ha seleccionado ningún insumo.');
    }
    this.change();
  }
  delete(item: any) {
    this.tablesupplies = this.tablesupplies.filter((element: any) => {
      if (element.idInsumo !== item.idInsumo) {
        return element;
      }
    });
    this.listsupplies.supplies = this.listsupplies.supplies.filter(
      (element: any) => {
        if (element.idInsumo !== item.idInsumo) {
          return element;
        }
      }
    );
    if (this.tablesupplies.length === 0) {
      this.count = 1;
      this.observations = '';
      this.splitZones = false;
      this.listsupplies = {
        deadline: '',
        supplies: [],
      };
      this.tablesupplies = [];
      this.selectModelSupplies = '0';
      this.tableSolicitudes = [];
    }
  }
  submitInfo(modalconfirmacion: any) {
    this.serviceWorkspaces
      .createRequest(this.selectMunicipality, this.listsupplies)
      .subscribe((data: any) => {
        this.dataOrder = data;
        this.modalService.open(modalconfirmacion, { centered: true });
        data.forEach((element) => {
          this.tableSolicitudes.push(element);
        });
        // this.toastr.success('Solicitud enviada correctamente');
        this.count = 1;
        this.observations = '';
        this.splitZones = false;
        this.listsupplies = {
          deadline: '',
          supplies: [],
        };
        this.tablesupplies = [];
        this.selectModelSupplies = '0';
        this.tableSolicitudes = [];
        this.selectProvider = 0;
        this.currentDate = new Date();
        this.currentDate.setDate(this.currentDate.getDate() + 16);
        this.listsupplies.deadline = this.currentDate
          .toISOString()
          .substring(0, 10);
        this.currentDate = this.clone(this.listsupplies.deadline);
      });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true });
  }
  closeModal(option: boolean, modalconfirmacion?: any) {
    if (option) {
      this.submitInfo(modalconfirmacion);
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  tab1() {
    this.tab = 1;
    this.router.navigate(['/insumos/solicitud', { tab: 1 }]);
  }
  tab2() {
    this.tab = 2;
    this.router.navigate(['/insumos/solicitud', { tab: 2 }]);
  }
  tab3() {
    this.tab = 3;
    this.router.navigate(['/insumos/solicitud', { tab: 3 }]);
    this.serviceProviders.getProviders().subscribe((element) => {
      this.providers = element;
    });
    this.changeStateGetPetition();
  }
  myFunctionCopyOrder(copyText: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  changeStateGetPetition() {
    this.petitionsForManager = [];
    this.serviceWorkspaces
      .getPetitionsForManager(this.providerIdPetition)
      .subscribe((response) => {
        this.petitionsForManager = response;
      });
  }
}
