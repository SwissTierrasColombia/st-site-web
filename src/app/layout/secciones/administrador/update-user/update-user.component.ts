import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/helpers/jwt';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';

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
  constructor(
    private router: Router,
    private toast: ToastrService,
    private serviceManagers: ManagersService,
    private serviceProviders: ProvidersService,
    private serviceWorkSpace: WorkspacesService,
    private activedRoute: ActivatedRoute,
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
    this.addprofiles = 0;
    this.deleteProfiles = 0;
    this.manager = false;
    this.provider = false;
  }

  ngOnInit(): void {
    const data = JwtHelper.getUserPublicInformation();
    //console.log(data);

    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe(
        response => {
          this.idUser = response.idUser;
        }
      );
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
      if (data.is_manager_director) {
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
        });
      }
      if (data.is_provider_director) {
        this.provider = true;
        this.serviceWorkSpace.GetProviderProfiles().subscribe(data => {
          this.profilesProvider = data;
        });
      }
    });
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
      this.profile = element;
      this.toast.success("Se ha actualizado la información del usuario.")
    });

  }
  addprofileManager() {
    let Checkprofile = true;
    this.profile.profilesManager.forEach((element: any) => {
      if (element.id == this.addprofiles) {
        Checkprofile = false;
      }
    });
    if (Checkprofile) {
      let data = {
        "profileId": this.addprofiles
      }
      this.serviceWorkSpace.AddProfileToUser(this.idUser, data).subscribe(element => {
        this.profile = element;
        this.toast.success("Se ha agregado el perfil correctamente.");
        this.addprofiles = 0;
      });
    } else {
      this.toast.info("El perfil ya fue agregado.")
    }
  }
  deleteprofileManager() {
    let Checkprofile = false;
    this.profile.profilesManager.forEach((element: any) => {
      if (element.id == this.deleteProfiles) {
        Checkprofile = true;
      }
    });
    if (Checkprofile) {
      let data = {
        "profileId": this.deleteProfiles
      }
      this.serviceWorkSpace.RemoveProfileToUser(this.idUser, data).subscribe(element => {
        this.profile = element;
        this.toast.success("Se ha eliminado el perfil correctamente.");
        this.deleteProfiles = 0;
      });
    } else {
      this.toast.info("El usuario no tiene ese perfil.")
    }
  }
  addprofileProvider() {
    let Checkprofile = true;
    this.profile.profilesProvider.forEach((element: any) => {
      if (element.id == this.addprofiles) {
        Checkprofile = false;
      }
    });
    if (Checkprofile) {
      let data = {
        "profileId": this.addprofiles
      }
      this.serviceWorkSpace.AddProfileToUser(this.idUser, data).subscribe(element => {
        this.profile = element;
        this.toast.success("Se ha agregado el perfil correctamente.");
        this.addprofiles = 0;
      });
    } else {
      this.toast.info("El perfil ya fue agregado.")
    }
  }
  deleteprofileProvider() {
    let Checkprofile = false;
    this.profile.profilesProvider.forEach((element: any) => {
      if (element.id == this.deleteProfiles) {
        Checkprofile = true;
      }
    });
    if (Checkprofile) {
      let data = {
        "profileId": this.deleteProfiles
      }
      this.serviceWorkSpace.RemoveProfileToUser(this.idUser, data).subscribe(element => {
        this.profile = element;
        this.toast.success("Se ha eliminado el perfil correctamente.");
        this.deleteProfiles = 0;
      });
    } else {
      this.toast.info("El usuario no tiene ese perfil.")
    }
  }

}
