import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  public options: Options;
  public munucipalities: Array<Select2OptionData>;

  activeManagers: any;
  docsSoport: File;
  departments: any;
  dataCreateWorkSpace: any;
  selectDepartment: number;
  selectMunicipality: string;
  viewCreateWorkSpace: boolean;
  resultWorkSpace: any;
  listWorkSpace: any;
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    private serviceManagers: ManagersService,
    private serviceWorkspaces: WorkspacesService,
    private router: Router,
    private roles: RoleModel,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private activedRoute: ActivatedRoute
  ) {
    this.activeManagers = [];
    this.departments = [];
    this.munucipalities = [
      {
        id: '0',
        text: 'Seleccione el Municipio',
      },
    ];
    this.resultWorkSpace = [];
    this.listWorkSpace = [];
    this.selectDepartment = 0;
    this.selectMunicipality = '0';
    this.viewCreateWorkSpace = false;
    this.dataCreateWorkSpace = {
      selectDepartment: '',
      supportFile: '',
      managerCode: '0',
      municipalityId: '',
      observations: '',
      startDate: '',
    };
    this.options = {
      width: '350',
      multiple: true,
      tags: false,
    };
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((response) => {
      if (response.selectDepartment) {
        this.selectDepartment = Number(response.selectDepartment);
        this.changeDepartament();
        this.selectMunicipality = response.selectMunicipality;
        setTimeout(() => {
          this.searchWorkSpace();
        }, 1000);
      }
    });
    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find((elem) => {
      return elem.id === this.roles.administrador;
    });
    if (role) {
      this.serviceManagers.getManagers().subscribe((data: any) => {
        this.activeManagers = data;
      });
    }

    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.departments = response;
    });
  }
  docSoport(file: File) {
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      const re = /pdf*/;
      if (file[0].type.match(re)) {
        this.dataCreateWorkSpace.supportFile = file[0];
      } else {
        this.dataCreateWorkSpace.supportFile = '';
        this.myInputVariable.nativeElement.value = '';
        this.toastr.error('Solo se permiten archivos PDF');
      }
    } else {
      this.dataCreateWorkSpace.supportFile = '';
      this.myInputVariable.nativeElement.value = '';
      this.toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }
  changeDepartament() {
    this.dataCreateWorkSpace.selectDepartment = this.selectDepartment;
    this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(
        Number(this.dataCreateWorkSpace.selectDepartment)
      )
      .subscribe((data: any) => {
        console.log(this.munucipalities);
        data.forEach((element) => {
          this.munucipalities.push({
            id: element.id + '',
            text: element.name,
          });
        });
        // this.munucipalities = data;
      });
  }
  searchWorkSpace() {
    this.dataCreateWorkSpace.municipalityId = this.selectMunicipality;
    this.serviceWorkspaces
      .getWorkSpaceByMunicipality(this.selectMunicipality.toString())
      .subscribe((response) => {
        this.resultWorkSpace = response;
        if (this.resultWorkSpace.length === 0) {
          this.viewCreateWorkSpace = true;
        } else {
          this.viewCreateWorkSpace = false;
          this.listWorkSpace = response;
          this.listWorkSpace.reverse();
        }
      });
  }
  createWorkSpace() {
    if (this.dataCreateWorkSpace.supportFile === '') {
      this.toastr.error('No se ha cargado ningún soporte.');
    } else if (this.dataCreateWorkSpace.observations === '') {
      this.toastr.error('Las observaciones son obligatorias.');
    } else {
      this.serviceWorkspaces
        .createWorkspace(this.dataCreateWorkSpace)
        .subscribe((_) => {
          this.toastr.success(
            'Se ha asignado el espacio de trabajo para el municipio seleccionado.'
          );
          this.dataCreateWorkSpace = {
            selectDepartment: '',
            supportFile: '',
            managerCode: '0',
            municipalityId: '',
            observations: '',
            startDate: '',
          };
          this.searchWorkSpace();
        });
    }
  }
  updateWorkSpace() {
    this.router.navigate([
      'gestion/workspace/' + this.selectMunicipality + '/operador',
    ]);
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModal(option: boolean) {
    if (option) {
      this.createWorkSpace();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
}
