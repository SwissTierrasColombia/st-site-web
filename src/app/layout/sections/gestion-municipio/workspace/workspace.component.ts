import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  departments: any;
  selectDepartment: number;

  constructor(
    private serviceWorkspaces: WorkspacesService
  ) {
    this.departments = [];
    this.selectDepartment = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }

}
