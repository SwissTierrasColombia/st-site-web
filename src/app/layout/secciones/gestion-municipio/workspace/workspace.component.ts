import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToLeft } from 'src/app/router.animations';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  animations: [slideToLeft()]
})
export class WorkspaceComponent implements OnInit {

  activeManagers: any;
  docsSoport: File;
  departments: any;
  munucipalities: any;
  dataCreateWorkSpace: any;
  selectDepartment: number;
  selectMunicipality: number;
  viewCreateWorkSpace: boolean;
  resultWorkSpace: any;
  listWorkSpace: any;
  constructor(
    private serviceManagers: ManagersService,
    private serviceWorkspaces: WorkspacesService,
    private router: Router,
    private roles: RoleModel,
    private toastr: ToastrService
  ) {
    this.activeManagers = [];
    this.departments = [];
    this.munucipalities = [];
    this.resultWorkSpace = [];
    this.listWorkSpace = [];
    this.selectDepartment = 0;
    this.selectMunicipality = 0;
    this.viewCreateWorkSpace = false;
    this.dataCreateWorkSpace = {
      selectDepartment: '',
      supportFile: '',
      managerCode: '0',
      municipalityId: '',
      observations: '',
      numberAlphanumericParcels: 0,
      startDate: '',
      municipalityArea: 0
    };

  }

  ngOnInit() {

    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find(elem => {
      return elem.id === this.roles.administrador;
    });
    if (role) {
      this.serviceManagers.getManagers()
        .subscribe(
          (data: any) => {
            this.activeManagers = data;
          });
    }

    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }
  docSoport(file: File) {
    this.dataCreateWorkSpace.supportFile = file[0];
  }
  changeDepartament() {
    this.dataCreateWorkSpace.selectDepartment = this.selectDepartment;
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.dataCreateWorkSpace.selectDepartment).subscribe(
      data => {
        this.munucipalities = data;
      }
    );
  }
  searchWorkSpace() {
    this.dataCreateWorkSpace.municipalityId = this.selectMunicipality;
    this.serviceWorkspaces.getWorkSpaceByMunicipality(this.selectMunicipality.toString()).subscribe(
      response => {
        this.resultWorkSpace = response;
        if (this.resultWorkSpace.length === 0) {
          this.viewCreateWorkSpace = true;
        } else {
          this.viewCreateWorkSpace = false;
          this.listWorkSpace = response;
        }
      }
    );
  }
  createWorkSpace() {
    const numberAlphanumericParcels = Number.isInteger(this.dataCreateWorkSpace.numberAlphanumericParcels);
    const municipalityArea = Number.isInteger(this.dataCreateWorkSpace.municipalityArea);

    if (this.dataCreateWorkSpace.supportFile === "") {
      this.toastr.info("No has subido ningún soporte.");
    } else if (this.dataCreateWorkSpace.observations == '') {
      this.toastr.info("Las observaciones son obligatorias.");
    } else if (!numberAlphanumericParcels) {
      this.toastr.info("El Número de predios alfanuméricos debe ser numerico.");
    } else if (!municipalityArea) {
      this.toastr.info("El Área del municipio debe ser numerico.");
    } else {
      this.serviceWorkspaces.createWorkspace(this.dataCreateWorkSpace).subscribe(
        _ => {
          this.toastr.success("Se ha asignado el espacio de trabajo para el municipio seleccionado.");
          this.searchWorkSpace();
        }
      );
    }
  }
  updateWorkSpace(idWorkspace: number) {
    this.router.navigate(['gestion/workspace/' + idWorkspace + '/operador']);
  }
  viewWorkSpace(idWorkspace: number) {
    this.router.navigate(['gestion/workspace/' + idWorkspace + '/ver/operador']);
  }

}
