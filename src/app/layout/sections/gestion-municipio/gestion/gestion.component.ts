import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/services/gestion-municipio/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  activeManagers: any;
  docsSoport: File;
  selectManager: number;
  departments: any;
  selectDepartment: number;
  constructor(
    private serviceManagers: ManagersService,
    private serviceWorkspaces: WorkspacesService
  ) {
    this.activeManagers = [];
    this.selectManager = 0;
    this.departments = [];
    this.selectDepartment = 0;
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
  docSoport(files: FileList) {
    this.docsSoport = files[0];
  }

}
