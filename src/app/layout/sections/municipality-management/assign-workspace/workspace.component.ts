import { selectInterface } from './../../../../shared/models/select.interface';
import { ValidateMunicipalitiesInterface } from './../../../../models/validateMunicipalities.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { CadastralAuthorityService } from 'src/app/services/v2/cadastral-authority/cadastral-authority.service';

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
  viewCreateWorkSpace: boolean;
  resultWorkSpace: any;
  listWorkSpace: any;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  createActive: boolean;
  selectAllMunicipalities: boolean;
  viewSelectAllMunicipalities: boolean;
  municipalitieValidate: ValidateMunicipalitiesInterface[];
  createActive2: boolean;
  viewBotton: boolean;
  constructor(
    private serviceManagers: ManagersService,
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cadastralAuthorityService: CadastralAuthorityService
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
    this.viewCreateWorkSpace = false;
    this.dataCreateWorkSpace = {
      selectDepartment: '0',
      supportFile: '',
      managerCode: '0',
      municipalityId: ['0'],
      observations: '',
      startDate: '',
    };
    this.options = {
      multiple: true,
      tags: false,
      width: '450',
    };
    this.createActive = false;
    this.createActive2 = false;
    this.selectAllMunicipalities = false;
    this.viewSelectAllMunicipalities = false;
    this.municipalitieValidate = [];
    this.viewBotton = false;
  }

  ngOnInit() {
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
  select($event: selectInterface) {
    if ($event.id === 'managers') {
      this.dataCreateWorkSpace.managerCode = $event.select;
    }
    if ($event.id === 'departments') {
      this.dataCreateWorkSpace.selectDepartment = $event.select;
    }
  }
  docSoport(file: File) {
    this.changeData();
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      const re = /pdf*/;
      if (file[0].type.match(re)) {
        this.dataCreateWorkSpace.supportFile = file[0];
        this.changeData();
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
    this.selectAllMunicipalities = false;
    this.dataCreateWorkSpace.municipalityId = ['0'];
    if (this.dataCreateWorkSpace.selectDepartment !== '0') {
      this.cadastralAuthorityService
        .getMunicipalities(
          this.dataCreateWorkSpace.managerCode,
          this.dataCreateWorkSpace.selectDepartment
        )
        .subscribe((data: any) => {
          this.viewSelectAllMunicipalities = true;
          this.changeData();
          this.munucipalities = [];
          data.forEach((element) => {
            this.munucipalities.push({
              id: element.id + '',
              text: element.name,
            });
          });
        });
    }
  }
  createWorkSpace() {
    if (this.dataCreateWorkSpace.supportFile === '') {
      this.toastr.error('No se ha cargado ningún soporte.');
    } else if (this.dataCreateWorkSpace.observations === '') {
      this.toastr.error('Las observaciones son obligatorias.');
    } else {
      let formdata = new FormData();
      formdata.append('managerCode', this.dataCreateWorkSpace.managerCode);
      formdata.append('startDate', this.dataCreateWorkSpace.startDate);
      formdata.append('observations', this.dataCreateWorkSpace.observations);
      formdata.append('supportFile', this.dataCreateWorkSpace.supportFile);
      for (
        let index = 0;
        index < this.dataCreateWorkSpace.municipalityId.length;
        index++
      ) {
        let validate = this.municipalitieValidate.find(
          (element) =>
            element.municipalityId ===
            this.dataCreateWorkSpace.municipalityId[index]
        );
        formdata.append(
          'municipalities[' + index + '].municipalityId',
          this.dataCreateWorkSpace.municipalityId[index]
        );
        if (validate) {
          formdata.append(
            'municipalities[' + index + '].observations',
            this.municipalitieValidate[index].observation
          );
        }
      }
      this.cadastralAuthorityService.assignManager(formdata).subscribe((_) => {
        this.toastr.success(
          'Se ha asignado el(los) gestor(es) para el(los) municipio(s) seleccionado(s).'
        );
        this.dataCreateWorkSpace = {
          selectDepartment: '0',
          supportFile: '',
          managerCode: '0',
          municipalityId: ['0'],
          observations: '',
          startDate: '',
        };
        console.log(this.dataCreateWorkSpace);
        this.createActive = false;
        this.createActive2 = false;
        this.viewBotton = false;
        this.viewSelectAllMunicipalities = false;
        this.selectAllMunicipalities = false;
        this.municipalitieValidate = [];
        this.myInputVariable.nativeElement.value = '';
      });
    }
  }
  validateMunicipalities(modal: any) {
    const validateMunicipalities =
      this.dataCreateWorkSpace.municipalityId.join();
    this.cadastralAuthorityService
      .validateMunicipalities(validateMunicipalities)
      .subscribe((element: ValidateMunicipalitiesInterface[]) => {
        this.municipalitieValidate = element.filter((x) => {
          if (x.conflict === true) {
            return { ...x, observation: '' };
          }
        });
        this.viewBotton = true;
        if (this.municipalitieValidate.length === 0) {
          this.toastr.success(
            'Puede asignar los municipios al gestor seleccionado, por favor haga click en Asignar Gestor Catastral'
          );
          this.createActive2 = true;
          this.openModal(modal);
        } else {
          this.toastr.info(
            'Tiene municipios en conflicto asignados ya a otro gestor, por favor completa los siguientes campos para poder ser asignados.'
          );
        }
      });
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
  changeData() {
    this.createActive = false;
    if (
      this.dataCreateWorkSpace.managerCode !== '0' &&
      this.dataCreateWorkSpace.startDate !== '' &&
      this.dataCreateWorkSpace.supportFile !== '' &&
      this.dataCreateWorkSpace.selectDepartment !== '0' &&
      this.dataCreateWorkSpace.municipalityId !== ['0'] &&
      this.dataCreateWorkSpace.observations !== ''
    ) {
      this.createActive = true;
    }
  }
  clickCheckBox() {
    this.selectAllMunicipalities = !this.selectAllMunicipalities;
    if (this.selectAllMunicipalities) {
      this.dataCreateWorkSpace.municipalityId = [];
      this.munucipalities.forEach((element) => {
        this.dataCreateWorkSpace.municipalityId.push(element.id);
      });
    } else {
      this.dataCreateWorkSpace.municipalityId = ['0'];
    }
  }
  validateWriteObservation() {
    const validate = this.municipalitieValidate.find(
      (x) => x.observation === ''
    );
    if (validate) {
      this.createActive2 = false;
    } else {
      this.createActive2 = true;
    }
  }
}
