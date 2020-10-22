import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspace-active',
  templateUrl: './workspace-active.component.html',
  styleUrls: ['./workspace-active.component.scss'],
})
export class WorkspaceActiveComponent implements OnInit {
  departments: any;
  selectDepartment: number;
  munucipalities: any;
  selectMunicipality: number;
  isAdministrator: boolean;
  isActive: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel,
    private router: Router,
    public toastrService: ToastrService
  ) {
    this.departments = [];
    this.selectDepartment = 0;
    this.munucipalities = 0;
    this.isAdministrator = false;
    this.selectMunicipality = 0;
  }

  ngOnInit(): void {
    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.departments = response;
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
      .GetMunicipalitiesByDeparment(Number(this.selectDepartment))
      .subscribe((data) => {
        this.munucipalities = data;
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
            { tab: 4 },
          ]);
        } else {
          this.isActive = false;
          this.toastrService.error(
            'No existe un espacio de trabajo para el municipio.'
          );
        }
      });
  }
}
