import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { OperatorsService } from 'src/app/services/operators/operators.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  dataUserLogger: any;
  roleConnect: any;
  botonRegistrar: boolean;
  constructor(
    private serviceManagers: ManagersService,
    private serviceProviders: ProvidersService,
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService,
    private serviceOperators: OperatorsService,
    private modalService: NgbModal
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
        roleId: 1
      },
      roleManager: {
        profiles: [],
        managerId: 0,
        roleId: 2
      },
      roleOperator: {
        roleId: 3,
        operatorId: 0
      },
      roleProvider: {
        isTechnical: false,
        profiles: [],
        providerId: 0,
        roleId: 4
      }
    };
    this.providers = [];
    this.managers = [];
    this.operators = [];
    this.selectROL = 0;
    this.dataUserLogger = {};
    this.roleConnect = {};
    this.botonRegistrar = true;
  }

  ngOnInit() {
    this.dataUserLogger = JwtHelper.getUserPublicInformation();
    this.roleConnect = this.dataUserLogger.roles.find(elem => {
      return elem.id === 5;
    });
    if (!this.roleConnect) {
      this.roleConnect = this.dataUserLogger.roles.find(elem => {
        return elem.id === 1;
      });
    }
    if (!this.roleConnect) {
      this.roleConnect = this.dataUserLogger.roles.find(elem => {
        return elem.id === 2;
      });
    }
    if (!this.roleConnect) {
      this.roleConnect = this.dataUserLogger.roles.find(elem => {
        return elem.id === 4;
      });
    }

    if (this.roleConnect.id === 1) {
      this.registerData.state = [{
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
      }];
      this.serviceManagers.getManagers().subscribe(
        data => {
          this.managers = data;
        }
      );
      this.serviceProviders.getProvidersActive().subscribe(
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
    if (this.roleConnect.id === 5) {
      this.selectROL = 1;
      this.registerData.state = [{
        id: 1,
        name: 'Administrador',
      }]
    }

    if (this.dataUserLogger.is_manager_director) {
      this.selectROL = 2;
      this.registerData.state = [
        {
          id: 2,
          name: 'Gestor',
        }
      ];
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
    if (this.dataUserLogger.is_provider_director) {
      if (this.dataUserLogger.entity.id === 8) {
        this.registerData.state = [
          {
            id: 4,
            name: 'Técnico',
          },
          {
            id: 5,
            name: 'Revisor'
          }
        ];
      } else {
        this.selectROL = 4;
        this.registerData.state = [
          {
            id: 4,
            name: 'Técnico',
          }
        ];
      }
      this.serviceWorkSpace.GetProviderProfiles().subscribe(
        data => {
          this.profilesProviders = data;
        }
      );
    }
  }
  getProfilesManager() {
    if (this.roleConnect.id === 1) {
      this.registerData.roleManager.profiles = [1];
      this.validfield();
    } else {

    }
  }
  getProfilesProviders(id: number) {
    if (this.roleConnect.id === 1) {
      this.registerData.roleProvider.profiles = [1];
      this.validfield();
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validfield() {
    if (this.registerData.firstName &&
      this.registerData.lastName &&
      this.registerData.username &&
      this.validateEmail(this.registerData.email) &&
      this.registerData.password &&
      this.registerData.confirmationPassword
      && this.selectROL != 0) {
      this.botonRegistrar = false;
    } else {
      this.botonRegistrar = true;
    }
  }
  register() {
    if (this.registerData.password === this.registerData.confirmationPassword) {
      let data = {
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
      if (this.validateEmail(this.registerData.email)) {
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

        if (this.selectROL === 4 || this.selectROL === 5) {
          if (this.selectROL === 5) {
            if (this.roleConnect.id === 4) {
              this.registerData.roleProvider.roleId = 4;
              this.registerData.roleProvider.isTechnical = false;
              this.registerData.roleProvider.profiles = [2];
              data.roleProvider = this.registerData.roleProvider;
            }
          }
          if (this.selectROL === 4) {
            this.registerData.roleProvider.roleId = 4;
            data.roleProvider = this.registerData.roleProvider;
            if (this.roleConnect.id === 4) {
              this.registerData.roleProvider.isTechnical = true;
            }
          }
        } else {
          delete data.roleProvider;
        }
        this.serviceWorkSpace.CreateUser(data).subscribe(
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
                roleId: 1
              },
              roleManager: {
                profiles: [],
                managerId: 0,
                roleId: 2
              },
              roleOperator: {
                roleId: 3,
                operatorId: 0
              },
              roleProvider: {
                isTechnical: false,
                profiles: [],
                providerId: 0,
                roleId: 4
              }
            };
            this.botonRegistrar = true;
            this.selectROL = 0;
            if (this.roleConnect.id === 1) {
              this.registerData.state = [{
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
              }];
              this.serviceManagers.getManagers().subscribe(
                data => {
                  this.managers = data;
                }
              );
              this.serviceProviders.getProvidersActive().subscribe(
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
            if (this.roleConnect.id === 5) {
              this.selectROL = 1;
              this.registerData.state = [{
                id: 1,
                name: 'Administrador',
              }]
            }

            if (this.dataUserLogger.is_manager_director) {
              this.selectROL = 2;
              this.registerData.state = [
                {
                  id: 2,
                  name: 'Gestor',
                }
              ];
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
            if (this.dataUserLogger.is_provider_director) {
              if (this.dataUserLogger.entity.id === 8) {
                this.registerData.state = [
                  {
                    id: 4,
                    name: 'Técnico',
                  },
                  {
                    id: 5,
                    name: 'Revisor'
                  }
                ];
              } else {
                this.selectROL = 4;
                this.registerData.state = [
                  {
                    id: 4,
                    name: 'Técnico',
                  }
                ];
              }
              this.serviceWorkSpace.GetProviderProfiles().subscribe(
                data => {
                  this.profilesProviders = data;
                }
              );
            }
          }
        );
      } else {
        this.toast.error('El correo electrónico ingresado no es válido.');
      }
    } else {
      this.toast.error('Las contraseñas no son iguales.');
    }

  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModal(option: boolean) {
    if (option) {
      this.register();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
}
