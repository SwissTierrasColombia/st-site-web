import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  registerData: any;
  providers: any;
  managers: any;
  profilesManagers: any;
  profilesProviders: any;
  constructor(
    private serviceManagers: ManagersService,
    private servicePrividers: ProvidersService,
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService
  ) {
    this.profilesManagers = [];
    this.profilesProviders = [];
    this.registerData = {
      activeManager: false,
      activeAdmin: false,
      activeProvider: false,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmationPassword: '',
      roleProvider: {
        profiles: [],
        providerId: 0,
        roleId: 0
      },
      roleAdministrator: {
        roleId: 0
      },
      roleManager: {
        profiles: [],
        managerId: 0,
        roleId: 0
      }
    };
    this.providers = [];
    this.managers = [];

  }

  ngOnInit() {
    this.serviceManagers.getManagers().subscribe(
      data => {
        this.managers = data;
      }
    );
    this.servicePrividers.getProviders().subscribe(
      data => {
        this.providers = data;
      }
    );
  }
  getProfilesManager() {
    this.serviceManagers.getManagersProfiles().subscribe(data => {
      this.profilesManagers = data;
    });
  }
  getProfilesProviders(id: number) {
    this.servicePrividers.getProfilesByProvider(id).subscribe(
      data => {
        this.profilesProviders = data;
      }
    );
  }
  register() {
    if (this.registerData.password === this.registerData.confirmationPassword) {
      const data = {
        email: this.registerData.email,
        username: this.registerData.username,
        firstName: this.registerData.firstName,
        lastName: this.registerData.lastName,
        password: this.registerData.password,
        roleAdministrator: {},
        roleProvider: {},
        roleManager: {}
      };

      if (this.registerData.activeAdmin) {
        this.registerData.roleAdministrator.roleId = 1;
        data.roleAdministrator = this.registerData.roleAdministrator;
      } else {
        delete data.roleAdministrator;
      }
      if (this.registerData.activeManager) {
        this.registerData.roleManager.roleId = 2;
        data.roleManager = this.registerData.roleManager;
      } else {
        delete data.roleManager;
      }
      if (this.registerData.activeProvider) {
        this.registerData.roleProvider.roleId = 4;
        data.roleProvider = this.registerData.roleProvider;
      } else {
        delete data.roleProvider;
      }

      console.log(data);

      this.serviceWorkSpace.createUser(data).subscribe(
        _ => {
          this.toast.success('Se ha registrado el usuario' + FuntionsGlobalsHelper.clone(this.registerData.username) + 'Correctamente');
          this.registerData = {
            activeManager: false,
            activeAdmin: false,
            activeProvider: false,
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmationPassword: '',
            roleProvider: {
              profiles: [],
              providerId: 0,
              roleId: 0
            },
            roleAdministrator: {
              roleId: 0
            },
            roleManager: {
              profiles: [],
              managerId: 0,
              roleId: 0
            }
          };
        }
      );
    } else {
      this.toast.info('Las contraseñas no son iguales');
    }

  }

}
