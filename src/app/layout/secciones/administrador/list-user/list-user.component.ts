import { Component, OnInit } from '@angular/core';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/helpers/jwt';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
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
  constructor(
    private serviceWorkspace: WorkspacesService,
    private modalService: ModalService,
    private router: Router
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
  }

  ngOnInit() {
    this.dataUserLogger = JwtHelper.getUserPublicInformation();

    this.roleConnectSuperAdmin = this.dataUserLogger.roles.find(elem => {
      return elem.id === 5;
    });
    this.roleConnectAdmin = this.dataUserLogger.roles.find(elem => {
      return elem.id === 1;
    });
    this.roleConnectManager = this.dataUserLogger.roles.find(elem => {
      return elem.id === 2;
    });
    this.roleConnectProvider = this.dataUserLogger.roles.find(elem => {
      return elem.id === 4;
    });
    //console.log(!this.roleConnectProvider);

    this.serviceWorkspace.GetUsers().subscribe(
      (arg: any) => {
        this.dataListUser = arg
        this.dataListUser = this.dataListUser.filter(
          (element: any) => {
            return element.username !== this.dataUserLogger.user_name;
          });
        console.log(this.dataListUser);
        this.dataListUser.sort(function (a: any, b: any) {
          if (a.entity.name > b.entity.name) {
            return 1;
          }
          if (a.entity.name < b.entity.name) {
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
  globalFuntionString(item: string) {
    return FuntionsGlobalsHelper.itemToLowerCase(item);
  }
  openModalEnabled(modal: string, idUser: number) {
    this.modalService.open(modal);
    this.idUserEnabled = idUser;
  }
  openModalDisabled(modal: string, idUser: number) {
    this.modalService.open(modal);
    this.idUserDisabled = idUser;
  }
  closeModalEnabled(modal: string, option: boolean) {
    if (option) {
      this.serviceWorkspace.EnableUser(this.idUserEnabled, {})
        .subscribe(
          data => {
            this.modalService.close(modal);
            for (let index = 0; index < this.dataListUser.length; index++) {
              if (this.dataListUser[index].id === this.idUserEnabled) {
                this.dataListUser[index] = data;
              }
            }
          }
        );
    } else {
      this.modalService.close(modal);
    }
  }
  closeModalDisabled(modal: string, option: boolean) {
    if (option) {
      this.serviceWorkspace.DisableUser(this.idUserDisabled, {})
        .subscribe(
          data => {
            this.modalService.close(modal);
            for (let index = 0; index < this.dataListUser.length; index++) {
              if (this.dataListUser[index].id === this.idUserDisabled) {
                this.dataListUser[index] = data;
              }
            }
          }
        );
    } else {
      this.modalService.close(modal);
    }
  }
  updateUser(idUser: number) {
    this.router.navigate(['/administrador/usuario/' + idUser + '/modificar']);
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
  }
  isDirector(item) {
    let data = item.profilesManager.find(element => {
      return element.id === 1;
    });
    let data2 = item.roles.find(element => {
      return element.name === "OPERADOR";
    });
    let data3 = item.rolesProvider.find(element => {
      return element.id === 1;
    });
    return (data || data2 || data3) ? true : false;
  }
  isProvider(item) {
    let data = item.roles.find(element => {
      return element.id === 4;
    });
    return data ? true : false;
  }
}
