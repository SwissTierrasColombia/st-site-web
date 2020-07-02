import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-integrations-possibles',
  templateUrl: './integrations-possibles.component.html',
  styleUrls: ['./integrations-possibles.component.scss']
})
export class IntegrationsPossiblesComponent implements OnInit {
  dataIntegration: any;

  constructor(
    private serviceWorkspace: WorkspacesService
  ) {
    this.dataIntegration = [];
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetPossiblesIntegration().subscribe(
      data => {
        this.dataIntegration = data;
      }
    );
  }

}
