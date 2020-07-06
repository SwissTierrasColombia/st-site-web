import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router, NavigationEnd } from '@angular/router';
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
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetPossiblesIntegration().subscribe(
      data => {
        this.dataIntegration = data;
        this.dataIntegration.sort(function (a: any, b: any) {
          if (a.municipalityDto.department.name > b.municipalityDto.department.name) {
            return 1;
          }
          if (a.municipalityDto.department.name < b.municipalityDto.department.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      }
    );
  }
  openModalXTF(modal: string, item: any) {
    this.selectIntegration = item;
    //this.modalService.open(modal);
    this.router.navigate(['/insumos/integracion',
      {
        departamento: this.selectIntegration.municipality.department.code,
        municipio: this.selectIntegration.municipality.code,
        tab: 3
      }
    ]);
  }
  closeModalXTF(modal: string, option: boolean) {
    if (option) {
      this.router.navigate(['/insumos/integracion',
        {
          departamento: this.selectIntegration.municipality.department.code,
          municipio: this.selectIntegration.municipality.code,
          tab: 3
        }
      ]);
      location.reload();
    }
    this.selectIntegration = {};
    this.modalService.close(modal);
  }

}
