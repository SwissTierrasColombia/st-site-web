import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-integrations-possibles',
  templateUrl: './integrations-possibles.component.html',
  styleUrls: ['./integrations-possibles.component.scss'],
})
export class IntegrationsPossiblesComponent implements OnInit {
  dataIntegration: any;
  selectIntegration: any;
  constructor(
    private router: Router,
    private serviceWorkspace: WorkspacesService,
    private modalService: NgbModal
  ) {
    this.dataIntegration = [];
    this.selectIntegration = {};
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

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
    this.serviceWorkspace.GetPossiblesIntegration().subscribe((data) => {
      this.dataIntegration = data;
      this.dataIntegration.sort(function (a: any, b: any) {
        if (a.municipality.code > b.municipality.code) {
          return 1;
        }
        if (a.municipality.code < b.municipality.code) {
          return -1;
        }
        //a must be equal to b
        return 0;
      });
    });
  }
  openModalXTF(modal: any, item: any) {
    this.selectIntegration = item;
    //this.modalService.open(modal, { centered: true, scrollable: true });
    this.router.navigate([
      '/insumos/integracion',
      {
        departamento: this.selectIntegration.municipality.department.code,
        municipio: this.selectIntegration.municipality.code,
        tab: 3,
      },
    ]);
  }
  closeModalXTF(option: boolean) {
    if (option) {
      this.router.navigate([
        '/insumos/integracion',
        {
          departamento: this.selectIntegration.municipality.department.code,
          municipio: this.selectIntegration.municipality.code,
          tab: 3,
        },
      ]);
      location.reload();
    }
    this.selectIntegration = {};
    this.modalService.dismissAll();
  }
}
