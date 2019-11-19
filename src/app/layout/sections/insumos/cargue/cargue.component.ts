import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { ToastrService } from 'ngx-toastr';
import { ManagersService } from 'src/app/services/gestion-municipio/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
@Component({
  selector: 'app-cargue',
  templateUrl: './cargue.component.html',
  styleUrls: ['./cargue.component.scss'],
  animations: [routerTransition()]
})
export class CargueComponent implements OnInit {
  activeManagers: any;
  docsSoport: File;
  selectManager: number;
  departments: any;
  selectDepartment: number;
  splitZones: boolean;
  respuestaValidador: any;
  constructor(
    private serviceManagers: ManagersService,
    private serviceWorkspaces: WorkspacesService,
    private insumosService: InsumosService,
    private toastr: ToastrService
  ) {
    this.activeManagers = [];
    this.selectManager = 0;
    this.departments = [];
    this.selectDepartment = 0;
    this.splitZones = false;
    this.respuestaValidador = [
      {
        isValid: null
      }
    ];
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
  loadFile(files: FileList) {
    this.insumosService.postFileImagen(files[0]).subscribe(
      response => {
        this.respuestaValidador = response;
      },
      error => {
        console.log(error as any);
      }
    ); // FIN DE METODO SUBSCRIBE
  }
  docSoport(files: FileList) {
    this.docsSoport = files[0];
  }

}
