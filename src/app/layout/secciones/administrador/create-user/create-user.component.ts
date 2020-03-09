import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { OperatorsService } from 'src/app/services/operators/operators.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  registerData: any;
  providers: any;
  managers: any;
  operators: any;
  profilesManagers: any;
  profilesProviders: any;
  selectROL: number;
  constructor(
    private serviceManagers: ManagersService,
    private serviceProviders: ProvidersService,
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService,
    private serviceOperators: OperatorsService
  ) {
    this.profilesManagers = [];
    this.profilesProviders = [];
    this.registerData = {
      state: [
        {
          id: 1,
          name: 'Administrador',
        },
        {
          id: 2,
          name: 'Gestor',
        },
        {
          id: 3,
          name: 'Operador',
        },
        {
          id: 4,
          name: 'Proveedor',
        }
      ],
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmationPassword: '',
      roleAdministrator: {
        roleId: 0
      },
      roleManager: {
        profiles: [],
        managerId: 0,
        roleId: 0
      },
      roleOperator: {
        roleId: 0,
        operatorId: 0
      },
      roleProvider: {
        profiles: [],
        providerId: 0,
        roleId: 0
      }
    };
    this.providers = [];
    this.managers = [];
    this.operators = [];
    this.selectROL = 0;
  }

  ngOnInit() {
    this.serviceManagers.getManagers().subscribe(
      data => {
        this.managers = data;
      }
    );
    this.serviceProviders.getProviders().subscribe(
      data => {
        this.providers = data;
      }
    );
    this.serviceOperators.getOperatorsByFilters().subscribe(
      response => {
        this.operators = response;
      }
    );
  }
  getProfilesManager() {
    this.serviceManagers.getManagersProfiles().subscribe(data => {
      this.profilesManagers = data;
    });
  }
  getProfilesProviders(id: number) {
    this.serviceProviders.getProfilesByProvider(id).subscribe(
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
        roleManager: {},
        roleOperator: {},
        roleProvider: {},
      };

      if (this.selectROL === 1) {
        this.registerData.roleAdministrator.roleId = 1;
        data.roleAdministrator = this.registerData.roleAdministrator;
      } else {
        delete data.roleAdministrator;
      }
      if (this.selectROL === 2) {
        this.registerData.roleManager.roleId = 2;
        data.roleManager = this.registerData.roleManager;
      } else {
        delete data.roleManager;
      }
      if (this.selectROL === 3) {
        this.registerData.roleOperator.roleId = 3;
        data.roleOperator = this.registerData.roleOperator;
      } else {
        delete data.roleOperator;
      }
      if (this.selectROL === 4) {
        this.registerData.roleProvider.roleId = 4;
        data.roleProvider = this.registerData.roleProvider;
      } else {
        delete data.roleProvider;
      }

      this.serviceWorkSpace.createUser(data).subscribe(
        _ => {
          this.toast.success('Se ha registrado el usuario ' + FuntionsGlobalsHelper.clone(this.registerData.username) + ' Correctamente');
          this.registerData = {
            state: [
              {
                id: 1,
                name: 'Administrador',
              },
              {
                id: 2,
                name: 'gestor',
              },
              {
                id: 3,
                name: 'Operador',
              },
              {
                id: 4,
                name: 'Proveedor',
              }
            ],
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmationPassword: '',
            roleAdministrator: {
              roleId: 0
            },
            roleManager: {
              profiles: [],
              managerId: 0,
              roleId: 0
            },
            roleOperator: {
              roleId: 0,
              operatorId: 0
            },
            roleProvider: {
              profiles: [],
              providerId: 0,
              roleId: 0
            },
          };
        }
      );
    } else {
      this.toast.info('Las contraseñas no son iguales');
    }

  }
}
