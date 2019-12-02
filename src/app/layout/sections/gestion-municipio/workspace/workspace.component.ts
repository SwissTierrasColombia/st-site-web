import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToLeft } from 'src/app/router.animations';
import { ManagersService } from 'src/app/services/gestion-municipio/managers.service';
import { Router } from '@angular/router';

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
      supportFile: File,
      managerCode: '',
      municipalityId: '',
      observations: '',
      numberAlphanumericParcels: '',
      startDate: '',
      municipalityArea: ''
    };
  }

  ngOnInit() {
    this.serviceManagers.getManagers()
      .subscribe(
        (data: any) => {
          this.activeManagers = data;
        });
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }
  docSoport(file: File) {
    console.log(file[0]);

    this.dataCreateWorkSpace.supportFile = file[0];
    console.log(this.dataCreateWorkSpace.supportFile);

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
          console.log(this.listWorkSpace);

        }
      }
    );
  }
  createWorkSpace() {
    this.serviceWorkspaces.createWorkspace(this.dataCreateWorkSpace).subscribe(
      _ => {
        this.searchWorkSpace();
      }
    );
  }
  updateWorkSpace(idWorkspace: number) {
    this.router.navigate(['gestion/workspace/' + idWorkspace + '/operador']);
  }
  viewWorkSpace(idWorkspace: number) {
    this.router.navigate(['gestion/workspace/' + idWorkspace + '/ver/operador']);
  }

}
