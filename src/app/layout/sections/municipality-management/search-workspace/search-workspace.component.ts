import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-search-workspace',
  templateUrl: './search-workspace.component.html',
  styleUrls: ['./search-workspace.component.scss'],
})
export class SearchWorkspaceComponent implements OnInit {
  departments: any;
  selectDepartment: number;
  munucipalities: any;
  selectMunicipality: number;
  isAdministrator: boolean;
  isActive: boolean;
  listWorkSpace: any;
  searchActive: boolean;
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
    this.listWorkSpace = [];
    this.searchActive = false;
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
    this.searchActive = false;
    this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(Number(this.selectDepartment))
      .subscribe((data) => {
        this.munucipalities = data;
        this.searchActive = true;
      });
  }
  searchWorkSpaceActive() {
    this.serviceWorkspaces
      .GetWorkspacesByLocation(
        this.selectDepartment,
        this.selectMunicipality === 0 ? null : this.selectMunicipality
      )
      .subscribe((response: any) => {
        if (response.length > 0) {
          console.log(response);
          this.listWorkSpace = response;
          this.isActive = true;
        } else {
          this.isActive = false;
          this.toastrService.error(
            'No existe un espacio de trabajo para el municipio.'
          );
        }
      });
  }
  updateWorkSpace(item: any) {
    this.selectMunicipality = item.municipality.id;
    this.router.navigate([
      'gestion/workspace/' + this.selectMunicipality + '/operador',
    ]);
  }
}
