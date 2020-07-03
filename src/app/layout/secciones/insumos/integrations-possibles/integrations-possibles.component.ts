import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-integrations-possibles',
  templateUrl: './integrations-possibles.component.html',
  styleUrls: ['./integrations-possibles.component.scss']
})
export class IntegrationsPossiblesComponent implements OnInit {
  dataIntegration: any;
  selectIntegration: any;
  constructor(
    private router: Router,
    private serviceWorkspace: WorkspacesService,
    private modalService: ModalService
  ) {
    this.dataIntegration = [];
    this.selectIntegration = {}
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetPossiblesIntegration().subscribe(
      data => {
        this.dataIntegration = data;
      }
    );
  }
  volver() {
    this.router.navigate(['/insumos/integracion']);
  }
  openModalXTF(modal: string, item: any) {
    this.selectIntegration = item;
    //this.modalService.open(modal);
    this.router.navigate(['/insumos/integracion',
      {
        departamento: this.selectIntegration.municipality.department.code,
        municipio: this.selectIntegration.municipality.code
      }
    ]);

  }
  closeModalXTF(modal: string, option: boolean) {
    if (option) {
      this.router.navigate(['/insumos/integracion',
        {
          departamento: this.selectIntegration.municipality.department.code,
          municipio: this.selectIntegration.municipality.code
        }
      ]);
    }
    this.selectIntegration = {};
    this.modalService.close(modal);
  }

}
