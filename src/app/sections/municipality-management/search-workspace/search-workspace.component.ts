import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';

const moment = _moment;
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
      this.departments.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        //a must be equal to b
        return 0;
      });

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
        this.munucipalities.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
        this.searchActive = true;
      });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  updateWorkSpace() {
    this.router.navigate([
      'gestion/workspace/' + this.selectMunicipality + '/operador',
    ]);
  }
}
