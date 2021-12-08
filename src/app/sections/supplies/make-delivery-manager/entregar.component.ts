import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-entregar',
  templateUrl: './entregar.component.html',
  styleUrls: ['./entregar.component.scss'],
})
export class EntregarComponent implements OnInit {
  usermanager: boolean;
  departments: any;
  selectDepartment: number;
  munucipalities: any;
  selectMunicipality: number;
  suppliesManagerRequest: any;
  selectSuppliesManagerRequest: any;
  allSupplies: any;
  size: any;
  number: any;
  totalElements: any;
  idSupplieDelete: number;
  deliverySupplies: any;
  sendSuppliesFilter: boolean;
  idWorkSpace: number;
  searchText: string;
  enabledButton: boolean;
  listDelivery: any;
  firstSearch: boolean;
  operators: any;
  selectOperatorId: number;
  managerId: number;
  countSearch: number;
  constructor(
    private roles: RoleModel,
    private serviceWorkspaces: WorkspacesService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.usermanager = false;
    this.departments = [];
    this.selectDepartment = 0;
    this.munucipalities = [];
    this.selectMunicipality = 0;
    this.suppliesManagerRequest = [];
    this.allSupplies = [];
    this.size = 20;
    this.number = 0;
    this.totalElements = 0;
    this.idSupplieDelete = 0;
    this.deliverySupplies = {
      observations: '',
      supplies: [],
      operatorCode: 0,
    };
    this.sendSuppliesFilter = true;
    this.idWorkSpace = 0;
    this.enabledButton = true;
    this.listDelivery = [];
    this.firstSearch = false;
    this.operators = [];
    this.selectOperatorId = 0;
    this.countSearch = 0;
  }

  ngOnInit() {
    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find((elem) => {
      return elem.id === this.roles.gestor;
    });
    if (role) {
      this.managerId = role.id;
      this.usermanager = true;
    }
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
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
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
        this.changeSelects();
      });
  }
  changeMunucipality() {
    this.serviceWorkspaces
      .getWorkSpaceActiveByMunicipality(this.selectMunicipality)
      .subscribe((response: any) => {
        this.idWorkSpace = response.id;
        this.changeSelects();
        this.serviceWorkspaces
          .getOnlyOperatorAssignByWorkspace(this.idWorkSpace)
          .subscribe((element: any) => {
            this.operators = element;
          });
      });
  }
  changeSelects() {
    this.sendSuppliesFilter = true;
    if (
      this.selectDepartment !== 0 &&
      this.selectMunicipality !== 0 &&
      this.selectOperatorId > 0
    ) {
      this.sendSuppliesFilter = false;
    }
  }
  changeOperator() {
    this.changeSelects();
    if (this.countSearch > 0 && this.selectOperatorId > 0) {
      this.search(1);
    }
    if (this.selectOperatorId <= 0) {
      this.countSearch = 0;
    }
    this.countSearch++;
  }
  search(page: number) {
    this.searchText = '';
    this.firstSearch = true;
    this.serviceWorkspaces
      .GetSuppliesByMunicipalityFilter(
        this.selectMunicipality,
        page,
        true,
        this.selectOperatorId
      )
      .subscribe((response: any) => {
        this.number = response.number + 1;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.allSupplies = response.items;
        this.allSupplies = this.allSupplies.filter((item: any) => {
          if (item.delivered === null || item.delivered === false) {
            return item;
          }
        });
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.allSupplies.length; index++) {
          if (this.allSupplies[index].typeSupply === null) {
            const owner = this.allSupplies[index].owners.find((data) => {
              return data.ownerType === 'CADASTRAL_AUTHORITY';
            });
            if (owner) {
              this.allSupplies[index].typeSupply = {
                provider: {
                  name: 'AUTORIDAD CATASTRAL',
                },
                name: '',
              };
            }
            if (!owner) {
              this.allSupplies[index].typeSupply = {
                provider: {
                  name: 'GESTOR',
                },
                name: 'Datos en modelo de insumos para el Municipio',
              };
            }
          }
          if (this.allSupplies[index].state.id === 1) {
            this.allSupplies[index].state.state = true;
          }
          if (this.allSupplies[index].state.id === 2) {
            this.allSupplies[index].state.state = false;
          }
        }
        this.deliverySupplies.supplies.map((item) => {
          this.allSupplies.find((element) => {
            if (item.supplyId === element.id) {
              element.delivery = true;
              element.observationsTosupplie = item.observations;
            }
          });
        });
      });
  }
  isAuthority(item: any) {
    const owner = item.owners.find((data) => {
      return data.ownerType === 'CADASTRAL_AUTHORITY';
    });
    return owner ? true : false;
  }
  clickCheckBox() {
    if (this.deliverySupplies.supplies.length > 0) {
      if (this.deliverySupplies.observations !== '') {
        const data = this.deliverySupplies.supplies.find((element) => {
          return element.observations === '';
        });
        if (data) {
          this.enabledButton = true;
        } else {
          this.enabledButton = false;
        }
      } else {
        this.enabledButton = true;
      }
    } else {
      this.enabledButton = true;
    }
  }
  builddelivery(item: any, state: boolean) {
    if (this.usermanager) {
      if (state) {
        const comprobarID = this.deliverySupplies.supplies.find((element) => {
          return element.supplyId === item.id;
        });
        if (comprobarID) {
          this.deliverySupplies.supplies.forEach((element) => {
            if (item.id === element.supplyId) {
              element.observations = item.observationsTosupplie;
            }
          });
          this.clickCheckBox();
        } else {
          this.deliverySupplies.supplies.push({
            supplyId: item.id,
            observations: item.observationsTosupplie
              ? item.observationsTosupplie
              : '',
          });
          this.clickCheckBox();
        }
      } else {
        this.deliverySupplies.supplies = this.deliverySupplies.supplies.filter(
          (e) => e.supplyId !== item.id
        );
        this.clickCheckBox();
      }
    } else {
      this.toastr.error(
        'No tiene los permisos necesarios para entregar el insumo.'
      );
    }
  }
  sendSupplies() {
    this.deliverySupplies.operatorCode = this.selectOperatorId;
    if (this.deliverySupplies.supplies.length > 0) {
      if (this.deliverySupplies.observations.length > 0) {
        const data = this.deliverySupplies.supplies.find((element) => {
          return element.observations === '';
        });
        if (data) {
          this.toastr.error('Le faltan algunas observaciones');
        } else {
          if (this.deliverySupplies.operatorCode === 0) {
            this.toastr.error('No ha seleccionado ningún operador');
          } else {
            this.serviceWorkspaces
              .deliveriesSupplies(this.idWorkSpace, this.deliverySupplies)
              .subscribe((_) => {
                this.toastr.success(
                  'Se ha realizado la entrega de los insumos al operador'
                );
                this.search(1);
                this.deliverySupplies = {
                  observations: '',
                  supplies: [],
                };
                this.enabledButton = true;
              });
          }
        }
      } else {
        this.toastr.error('Las observaciones generales son obligatorias');
      }
    } else {
      this.toastr.error(
        'No ha seleccionado ningún insumo, ó te faltan las observaciones'
      );
    }
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModal(option: boolean) {
    if (option) {
      this.sendSupplies();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
}
