import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/helpers/jwt';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  profile: any;
  firstName: string;
  lastName: string;
  profilesManagers: any;
  registerData: any;
  managers: any;
  dataListUser: any;
  idUser: number;
  addprofiles: any;
  deleteProfiles: any;
  manager: boolean;
  provider: boolean;
  profilesProvider: any;
  dataJWT: any;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private serviceManagers: ManagersService,
    private serviceWorkSpace: WorkspacesService,
    private activedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.idUser = 0;
    this.dataListUser = {};
    this.profile = {
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
      profilesManager: [],
      profilesProvider: []
    };
    this.profilesManagers = [];
    this.profilesProvider = [];
    this.addprofiles = {};
    this.deleteProfiles = {};
    this.manager = false;
    this.provider = false;
    this.dataJWT = {};
  }

  ngOnInit(): void {
    this.dataJWT = JwtHelper.getUserPublicInformation();
    this.activedRoute.params.subscribe(
      response => {
        this.idUser = response.idUser;
      }
    );
    const promise1 = new Promise((resolve) => {
      this.serviceWorkSpace.GetUsers().subscribe(
        (arg: any) => {
          this.dataListUser = arg
          this.profile = this.dataListUser.find((element: any) => {
            if (element.id == this.idUser) {
              return element;
            }
          });
          this.firstName = this.profile.firstName;
          this.lastName = this.profile.lastName;
          resolve(this.profile);
        });
    });
    Promise.all([promise1]).then((values: any) => {
      if (this.dataJWT.is_manager_director) {
        this.manager = true;
        this.serviceManagers.getManagersProfiles().subscribe(data => {
          this.profilesManagers = data;
          this.profilesManagers = this.profilesManagers.filter(
            item => {
              if (item.id != 1) {
                return item;
              }
            }
          );
          this.profilesManagers.forEach(element => {
            let data = this.profile.profilesManager.find(item => {
              return item.id == element.id
            });
            if (data) {
              element.enabled = true;
            } else {
              element.enabled = false;
            }
          });
        });
      }
      if (this.dataJWT.is_provider_director) {
        this.provider = true;
        this.serviceWorkSpace.GetProviderProfiles().subscribe(data => {
          this.profilesProvider = data;

          this.profilesProvider.forEach(element => {
            let data = this.profile.profilesProvider.find(item => {
              return item.id == element.id
            });
            if (data) {
              element.enabled = true;
            } else {
              element.enabled = false;
            }
          });
        });
      }
    });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  volver() {
    this.router.navigate(['/administrador/usuarios']);
  }
  submitChange() {
    let data = {
      "firstName": this.firstName,
      "lastName": this.lastName
    }
    this.serviceWorkSpace.UpdateUser(this.idUser, data).subscribe(element => {
      this.serviceWorkSpace.GetUsers().subscribe(
        (arg: any) => {
          this.dataListUser = arg
          this.profile = this.dataListUser.find((element: any) => {
            if (element.id == this.idUser) {
              return element;
            }
          });
          this.firstName = this.profile.firstName;
          this.lastName = this.profile.lastName;
          if (this.dataJWT.is_manager_director) {
            this.profilesManagers.forEach(element => {
              let data = this.profile.profilesManager.find(item => {
                return item.id == element.id
              });
              if (data) {
                element.enabled = true;
              } else {
                element.enabled = false;
              }
            });
          }
          if (this.dataJWT.is_provider_director) {
            this.profilesProvider.forEach(element => {
              let data = this.profile.profilesProvider.find(item => {
                return item.id == element.id
              });
              if (data) {
                element.enabled = true;
              } else {
                element.enabled = false;
              }
            });
          }
        });
      this.toast.success("Se ha actualizado la información del usuario.");
    });

  }
  addprofileManager() {
    let data = {
      "profileId": this.addprofiles.id
    };
    this.serviceWorkSpace.AddProfileToUser(this.idUser, data).subscribe(element => {
      this.profile = element;
      this.toast.success("Se ha agregado el perfil correctamente.");
      this.addprofiles = {};
      this.profilesManagers.forEach(element => {
        let data = this.profile.profilesManager.find(item => {
          return item.id == element.id
        });
        if (data) {
          element.enabled = true;
        } else {
          element.enabled = false;
        }
      });
    });
  }
  deleteprofileManager() {
    let data = {
      "profileId": this.deleteProfiles.id
    };
    this.serviceWorkSpace.RemoveProfileToUser(this.idUser, data).subscribe(element => {
      this.profile = element;
      this.toast.success("Se ha eliminado el perfil correctamente.");
      this.deleteProfiles = {};
      this.profilesManagers.forEach(element => {
        let data = this.profile.profilesManager.find(item => {
          return item.id == element.id
        });
        if (data) {
          element.enabled = true;
        } else {
          element.enabled = false;
        }
      });
    });
  }
  addprofileProvider() {
    let data = {
      "profileId": this.addprofiles.id
    }
    this.serviceWorkSpace.AddProfileToUser(this.idUser, data).subscribe(element => {
      this.profile = element;
      this.toast.success("Se ha agregado el perfil correctamente.");
      this.addprofiles = {};
      this.profilesProvider.forEach(element => {
        let data = this.profile.profilesProvider.find(item => {
          return item.id == element.id
        });
        if (data) {
          element.enabled = true;
        } else {
          element.enabled = false;
        }
      });
    });
  }
  deleteprofileProvider() {
    let data = {
      "profileId": this.deleteProfiles.id
    }
    this.serviceWorkSpace.RemoveProfileToUser(this.idUser, data).subscribe(element => {
      this.profile = element;
      this.toast.success("Se ha eliminado el perfil correctamente.");
      this.profilesProvider.forEach(element => {
        let data = this.profile.profilesProvider.find(item => {
          return item.id == element.id
        });
        if (data) {
          element.enabled = true;
        } else {
          element.enabled = false;
        }
      });
    });
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
  }
  openModaladdManager(modal: string, item: any) {
    this.addprofiles = this.clone(item);
    this.modalService.open(modal);

  }
  closeModalEnabled(modal: string, option: boolean) {
    if (option) {
      this.addprofileManager();
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }
  openModalRemoveManager(modal: string, item: any) {
    this.deleteProfiles = this.clone(item);
    this.modalService.open(modal);
  }
  closeModalRemoveManager(modal: string, option: boolean) {
    if (option) {
      this.deleteprofileManager();
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }
  openModalRemoveProvider(modal: string, item: any) {
    this.deleteProfiles = this.clone(item);
    this.modalService.open(modal);
  }
  openModaladdProvider(modal: string, item: any) {
    this.addprofiles = this.clone(item);
    this.modalService.open(modal);
  }
  closeModalEnabledProvider(modal: string, option: boolean) {
    if (option) {
      this.addprofileProvider();
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }
  closeModalRemoveProvider(modal: string, option: boolean) {
    if (option) {
      this.deleteprofileProvider();
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }
  isDelegado() {
    let data = this.profile.rolesProvider.find(element => {
      return element.id === 2;
    });
    return data ? true : false;
  }
}
