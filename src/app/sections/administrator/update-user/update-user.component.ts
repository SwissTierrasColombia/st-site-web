import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
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
  updateInfo: boolean;
  email: EmailValidator;
  tab: number;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private serviceManagers: ManagersService,
    private serviceWorkSpace: WorkspacesService,
    private activedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.idUser = 0;
    this.dataListUser = {};
    this.profile = {
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
      profilesManager: [],
      profilesProvider: [],
    };
    this.profilesManagers = [];
    this.profilesProvider = [];
    this.addprofiles = {};
    this.deleteProfiles = {};
    this.manager = false;
    this.provider = false;
    this.dataJWT = {};
    this.updateInfo = false;
    this.tab = 0;
  }

  ngOnInit(): void {
    this.dataJWT = JwtHelper.getUserPublicInformation();
    this.activedRoute.params.subscribe((response) => {
      this.idUser = response.idUser;
      if (response.tab) {
        this.tab = parseInt(response.tab);
      }
    });
    const promise1 = new Promise((resolve) => {
      this.serviceWorkSpace.getUsers().subscribe((arg: any) => {
        this.dataListUser = arg;
        this.profile = this.dataListUser.find((element: any) => {
          if (element.id == this.idUser) {
            return element;
          }
        });
        this.firstName = this.profile.firstName;
        this.lastName = this.profile.lastName;
        this.email = this.profile.email;
        resolve(this.profile);
      });
    });
    Promise.all([promise1]).then((values: any) => {
      if (this.dataJWT.is_manager_director) {
        this.manager = true;
        this.serviceManagers.getManagersProfiles().subscribe((data) => {
          this.profilesManagers = data;
          this.profilesManagers = this.profilesManagers.filter((item) => {
            if (item.id != 1) {
              return item;
            }
          });
          this.profilesManagers.forEach((element) => {
            let data = this.profile.profilesManager.find((item) => {
              return item.id == element.id;
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
        this.serviceWorkSpace.GetProviderProfiles().subscribe((data) => {
          this.profilesProvider = data;

          this.profilesProvider.forEach((element) => {
            let data = this.profile.profilesProvider.find((item) => {
              return item.id == element.id;
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
    this.router.navigate(['/administrador/usuarios/' + this.tab]);
  }
  submitChange() {
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
    this.serviceWorkSpace.UpdateUser(this.idUser, data).subscribe((element) => {
      this.updateInfo = false;
      this.serviceWorkSpace.getUsers().subscribe((arg: any) => {
        this.dataListUser = arg;
        this.profile = this.dataListUser.find((element: any) => {
          if (element.id == this.idUser) {
            return element;
          }
        });
        this.firstName = this.profile.firstName;
        this.lastName = this.profile.lastName;
        this.email = this.profile.email;
        if (this.dataJWT.is_manager_director) {
          this.profilesManagers.forEach((element) => {
            let data = this.profile.profilesManager.find((item) => {
              return item.id == element.id;
            });
            if (data) {
              element.enabled = true;
            } else {
              element.enabled = false;
            }
          });
        }
        if (this.dataJWT.is_provider_director) {
          this.profilesProvider.forEach((element) => {
            let data = this.profile.profilesProvider.find((item) => {
              return item.id == element.id;
            });
            if (data) {
              element.enabled = true;
            } else {
              element.enabled = false;
            }
          });
        }
      });
      this.toast.success('Se ha actualizado la información del usuario.');
    });
  }
  addprofileManager() {
    let data = {
      profileId: this.addprofiles.id,
    };
    this.serviceWorkSpace
      .AddProfileToUser(this.idUser, data)
      .subscribe((element) => {
        this.profile = element;
        this.toast.success('Se ha agregado el perfil correctamente.');
        this.addprofiles = {};
        this.profilesManagers.forEach((element) => {
          let data = this.profile.profilesManager.find((item) => {
            return item.id == element.id;
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
      profileId: this.deleteProfiles.id,
    };
    this.serviceWorkSpace
      .RemoveProfileToUser(this.idUser, data)
      .subscribe((element) => {
        this.profile = element;
        this.toast.success('Se ha eliminado el perfil correctamente.');
        this.deleteProfiles = {};
        this.profilesManagers.forEach((element) => {
          let data = this.profile.profilesManager.find((item) => {
            return item.id == element.id;
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
      profileId: this.addprofiles.id,
    };
    this.serviceWorkSpace
      .AddProfileToUser(this.idUser, data)
      .subscribe((element) => {
        this.profile = element;
        this.toast.success('Se ha agregado el perfil correctamente.');
        this.addprofiles = {};
        this.profilesProvider.forEach((element) => {
          let data = this.profile.profilesProvider.find((item) => {
            return item.id == element.id;
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
      profileId: this.deleteProfiles.id,
    };
    this.serviceWorkSpace
      .RemoveProfileToUser(this.idUser, data)
      .subscribe((element) => {
        this.profile = element;
        this.toast.success('Se ha eliminado el perfil correctamente.');
        this.profilesProvider.forEach((element) => {
          let data = this.profile.profilesProvider.find((item) => {
            return item.id == element.id;
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
    event.stopPropagation();
  }
  openModaladdManager(modal: any, item: any) {
    this.addprofiles = this.clone(item);
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalEnabled(option: boolean) {
    if (option) {
      this.addprofileManager();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  openModalRemoveManager(modal: any, item: any) {
    this.deleteProfiles = this.clone(item);
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalRemoveManager(option: boolean) {
    if (option) {
      this.deleteprofileManager();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  openModalRemoveProvider(modal: any, item: any) {
    this.deleteProfiles = this.clone(item);
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  openModaladdProvider(modal: any, item: any) {
    this.addprofiles = this.clone(item);
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalEnabledProvider(option: boolean) {
    if (option) {
      this.addprofileProvider();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  closeModalRemoveProvider(option: boolean) {
    if (option) {
      this.deleteprofileProvider();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  isDelegado() {
    let data = this.profile.rolesProvider.find((element) => {
      return element.id === 2;
    });
    return data ? true : false;
  }
  changeInfoUser() {
    this.updateInfo = false;
    if (this.firstName != '' || this.lastName != '' || this.email) {
      this.updateInfo = true;
    }
  }
  openModalInfoUser(modalUpdateInfo: any) {
    this.modalService.open(modalUpdateInfo, {
      centered: true,
      scrollable: true,
    });
  }
  closeModalInfoUser(option: boolean) {
    this.modalService.dismissAll();
    if (option) {
      this.submitChange();
    }
  }
}
