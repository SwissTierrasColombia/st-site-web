import { Component, OnInit } from '@angular/core';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Router } from '@angular/router';

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

  }

  ngOnInit() {
    this.serviceWorkspace.GetUsers().subscribe(
      (arg: any) => {
        this.dataListUser = arg
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
}
