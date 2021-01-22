import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspace-refuse',
  templateUrl: './workspace-refuse.component.html',
  styleUrls: ['./workspace-refuse.component.scss'],
})
export class WorkspaceRefuseComponent implements OnInit {
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
      });
  }
  refuseWorkSpaceActive() {
  }
  changeMunicipalitie() {
    this.isActiveSearch = false;
    if (this.selectMunicipality !== 0) {
      this.isActiveSearch = true;
    }
  }
}
