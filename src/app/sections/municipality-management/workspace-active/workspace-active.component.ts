import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspace-active',
  templateUrl: './workspace-active.component.html',
  styleUrls: ['./workspace-active.component.scss'],
})
export class WorkspaceActiveComponent implements OnInit {
  activeManagers: any;
  selectManager: number;
  munucipalities: any;
  selectMunicipality: number;
  isAdministrator: boolean;
  isActive: boolean;
  isActiveSearch: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel,
    private router: Router,
    public toastrService: ToastrService,
    private serviceManagers: ManagersService
  ) {
    this.activeManagers = [];
    this.selectManager = 0;
    this.munucipalities = 0;
    this.isAdministrator = false;
    this.selectMunicipality = 0;
    this.isActiveSearch = false;
  }

  ngOnInit(): void {
    this.serviceManagers.getManagers().subscribe((data: any) => {
      this.activeManagers = data;
    });
    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find((elem) => {
      return elem.id === this.roles.administrador;
    });
    this.isAdministrator = false;
    if (role) {
      this.isAdministrator = true;
    }
  }

  changeDepartament() {
    this.serviceWorkspaces
      .getMunicipalitiesByManager(this.selectManager)
      .subscribe((data) => {
        this.munucipalities = data;
        this.munucipalities.sort(function (a, b) {
          if (a.department.name > b.department.name) {
            return 1;
          }
          if (a.department.name < b.department.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      });
  }
  searchWorkSpaceActive() {
    this.serviceWorkspaces
      .getWorkSpaceByMunicipality(this.selectMunicipality.toString())
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.isActive = true;
          this.router.navigate([
            'gestion/workspace/' + this.selectMunicipality + '/operador',
          ]);
        } else {
          this.isActive = false;
          this.toastrService.error('No existe una gestión del municipio.');
        }
      });
  }
  changeMunicipalitie() {
    this.isActiveSearch = false;
    if (this.selectMunicipality !== 0) {
      this.isActiveSearch = true;
    }
  }
}
