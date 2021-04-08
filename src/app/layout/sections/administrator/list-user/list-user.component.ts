import { Component, OnInit } from '@angular/core';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/helpers/jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { OperatorsService } from 'src/app/services/operators/operators.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  dataListUser: any;
  page: number;
  pageSize: number;
  searchText: string;
  idUserEnabled: number;
  idUserDisabled: number;
  dataUserLogger: any;
  roleConnectSuperAdmin: any;
  roleConnectAdmin: any;
  roleConnectManager: any;
  roleConnectProvider: any;
  tab: number;
  managers: any;
  operators: any;
  providers: any;
  usersManagers: any;
  usersOperators: any;
  usersProviders: any;
  managerId: number;
  operatorId: number;
  providerId: number;
  constructor(
    private serviceWorkspace: WorkspacesService,
    private modalService: NgbModal,
    private router: Router,
    private administrationService: AdministrationService,
    private managersService: ManagersService,
    private operatorsService: OperatorsService,
    private providersService: ProvidersService
  ) {
    this.dataListUser = [];
    this.page = 1;
    this.pageSize = 10;
    this.idUserDisabled = 0;
    this.idUserEnabled = 0;
    this.dataUserLogger = {};
    this.roleConnectSuperAdmin = {};
    this.roleConnectAdmin = {};
    this.roleConnectManager = {};
    this.roleConnectProvider = {};
    this.tab = 1;
    this.managers = [];
    this.operators = [];
    this.providers = [];
    this.managerId = 0;
    this.operatorId = 0;
    this.providerId = 0;
    this.usersManagers = [];
    this.usersOperators = [];
    this.usersProviders = [];
  }

  ngOnInit() {
    this.dataUserLogger = JwtHelper.getUserPublicInformation();

    this.roleConnectSuperAdmin = this.dataUserLogger.roles.find((elem) => {
      return elem.id === 5;
    });
    this.roleConnectAdmin = this.dataUserLogger.roles.find((elem) => {
      return elem.id === 1;
    });
    this.roleConnectManager = this.dataUserLogger.roles.find((elem) => {
      return elem.id === 2;
    });
    this.roleConnectProvider = this.dataUserLogger.roles.find((elem) => {
      return elem.id === 4;
    });
    this.serviceWorkspace.getUsers().subscribe((arg: any) => {
      this.dataListUser = arg;
      this.dataListUser = this.dataListUser.filter((element: any) => {
        return element.username !== this.dataUserLogger.user_name;
      });
      if (this.roleConnectAdmin) {
        this.tab1();
        this.managersService.getManagers().subscribe((data) => {
          this.managers = data;
        });
        this.operatorsService.getOperatorsByFilters().subscribe((response) => {
          this.operators = response;
        });
        this.providersService.getProvidersActive().subscribe((data) => {
          this.providers = data;
        });
      }
    });
  }

  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  globalFuntionString(item: string) {
    return FuntionsGlobalsHelper.itemToLowerCase(item);
  }
  openModalEnabled(modal: any, idUser: number) {
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.idUserEnabled = idUser;
  }
  openModalDisabled(modal: any, idUser: number) {
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.idUserDisabled = idUser;
  }
  closeModalEnabled(option: boolean) {
    if (option) {
      this.serviceWorkspace
        .EnableUser(this.idUserEnabled, {})
        .subscribe((data) => {
          this.modalService.dismissAll();
          for (let index = 0; index < this.dataListUser.length; index++) {
            if (this.dataListUser[index].id === this.idUserEnabled) {
              this.dataListUser[index] = data;
            }
          }
        });
    } else {
      this.modalService.dismissAll();
    }
  }
  closeModalDisabled(option: boolean) {
    if (option) {
      this.serviceWorkspace
        .DisableUser(this.idUserDisabled, {})
        .subscribe((data) => {
          this.modalService.dismissAll();
          for (let index = 0; index < this.dataListUser.length; index++) {
            if (this.dataListUser[index].id === this.idUserDisabled) {
              this.dataListUser[index] = data;
            }
          }
        });
    } else {
      this.modalService.dismissAll();
    }
  }
  updateUser(idUser: number) {
    this.router.navigate(['/administrador/usuario/' + idUser + '/modificar']);
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  isDirector(item) {
    let data = item.profilesManager.find((element) => {
      return element.id === 1;
    });
    let data2 = item.roles.find((element) => {
      return element.name === 'OPERADOR';
    });
    let data3 = item.rolesProvider.find((element) => {
      return element.id === 1;
    });
    return data || data2 || data3 ? true : false;
  }
  isDirectorManager(item) {
    let data = item.profiles.find((element) => {
      return element.id === 1;
    });
    return data ? true : false;
  }
  isDirectorProvider(item) {
    let data = item.roles.find((element) => {
      return element.id === 1;
    });
    return data ? true : false;
  }
  isProvider(item) {
    let data = item.roles.find((element) => {
      return element.id === 4;
    });
    return data ? true : false;
  }
  isDelegado(item) {
    let data = item.rolesProvider.find((element) => {
      return element.id === 2;
    });
    return data ? true : false;
  }
  tab1() {
    this.tab = 1;
    this.administrationService
      .getManagerUser(this.managerId)
      .subscribe((response) => {
        this.usersManagers = response;
      });
  }
  tab2() {
    this.tab = 2;
    this.administrationService
      .getOperatorUser(this.operatorId)
      .subscribe((response) => {
        this.usersOperators = response;
      });
  }
  tab3() {
    this.tab = 3;
    this.administrationService
      .getProviderUser(this.providerId)
      .subscribe((response) => {
        this.usersProviders = response;
      });
  }
}
