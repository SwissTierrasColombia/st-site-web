import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ManagersService } from 'src/app/services/managers/managers.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { saveAs } from 'file-saver';
import { ModalService } from 'src/app/services/modal/modal.service';

const moment = _moment;
@Component({
  selector: 'app-operator-assignment',
  templateUrl: './operator-assignment.component.html',
  styleUrls: ['./operator-assignment.component.scss']
})

export class OperatorAssignmentComponent implements OnInit {

  dataWorkSpace: any;
  tab: number;
  departaments: any;
  munucipalities: any;
  selectDepartment: number;
  selectMunicipality: number;
  editForm: any;
  idWorkspace: number;
  dataSoports: any;
  operators: any;
  selectOperator: number;
  dataOperatorsWorkSpace: any;
  supportFileOperator: any;
  assingOperator: boolean;
  replaceOperator: boolean;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private serviceManagers: ManagersService,
    private toastr: ToastrService,
    private serviceOperators: OperatorsService,
    private roles: RoleModel,
    private modalService: ModalService,

  ) {
    this.dataWorkSpace = {
      manager: {},
      municipality: {
        department: {}
      }
    };
    this.tab = 1;
    this.idWorkspace = 0;
    this.departaments = [];
    this.munucipalities = [];
    this.selectDepartment = 0;
    this.selectMunicipality = 0;
    this.editForm = {
      municipalityArea: true,
      numberAlphanumericParcels: true,
      startDate: true,
      observations: true
    };
    this.dataSoports = [];
    this.operators = [];
    this.selectOperator = 0;
    this.dataOperatorsWorkSpace = {
      startDate: '',
      endDate: '',
      numberParcelsExpected: 0,
      workArea: 0,
      observations: '',
      operatorCode: 0
    };
    this.assingOperator = false;
    this.replaceOperator = false;
  }

  ngOnInit() {
    const rol = JwtHelper.getUserPublicInformation();
    const roleManager = rol.roles.find((elem: any) => {
      return elem.id === this.roles.gestor;
    });
    if (roleManager) {
      this.assingOperator = true;
    }
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departaments = response;
      });
    this.activedRoute.params.subscribe(
      response => {
        this.selectMunicipality = response.idWorkspace;
      }
    );

    const promise1 = new Promise((resolve) => {
      this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
        (response: any) => {
          this.idWorkspace = response.id;
          resolve(response)
        }
      );
    });
    Promise.all([promise1]).then((values: any) => {
      this.serviceWorkspaces.getWorkSpace(this.idWorkspace).subscribe(
        response => {
          this.dataWorkSpace = response;
          if (this.dataWorkSpace.operators.length > 0) {
            this.replaceOperator = true;
            this.dataOperatorsWorkSpace = this.dataWorkSpace.operators[0];
            this.dataOperatorsWorkSpace.startDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.startDate);
            this.dataOperatorsWorkSpace.endDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.endDate);
          }
        }
      );
    });
  }
  spaceActive() {

  }

  docSoport(files: FileList) {
    var re = /zip*/;
    if (files[0].type.match(re)) {
      this.supportFileOperator = files[0];
    } else {
      if (files[0].size / 1024 / 1024 > 1) {
        this.toastr.error("Por favor convierta el archivo en .zip antes de subirlo, ya que supera el tamaño de cargue permitido.")
        this.supportFileOperator = undefined;
      } else {
        this.supportFileOperator = files[0];
      }
    }
  }

  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  formatDateCalendar(date: string) {
    moment.locale('es');
    return moment(date).format('ll');
  }
  volver() {
    this.router.navigate(['/gestion/workspace']);
  }
  changeUpdate() {
    this.editForm = {
      municipalityArea: false,
      numberAlphanumericParcels: false,
      startDate: false,
      observations: false
    };
  }
  update() {
    const dataUpdate = new FormData();
    dataUpdate.append('startDate', this.dataWorkSpace.startDate);
    dataUpdate.append('observations', this.dataWorkSpace.observations);
    dataUpdate.append('numberAlphanumericParcels', this.dataWorkSpace.numberAlphanumericParcels);
    dataUpdate.append('municipalityArea', this.dataWorkSpace.municipalityArea);
    this.serviceWorkspaces.updateWorkSpace(this.idWorkspace, dataUpdate).subscribe(_ => {
      this.editForm = {
        municipalityArea: true,
        numberAlphanumericParcels: true,
        startDate: true,
        observations: true
      };
      this.toastr.success('Información Actualizada');
    });
  }
  getSopports() {
    this.tab = 2;
    this.serviceWorkspaces.getSupportsByWorkSpace(this.idWorkspace).subscribe(response => {
      this.dataSoports = response;

    });
  }
  getOperator() {
    this.tab = 3;
    this.serviceOperators.getOperatorsByFilters().subscribe(
      response => {
        this.operators = response;
      }
    );
  }
  assingOperatorInWorkSpace() {
    const dataOperator = new FormData();
    dataOperator.append('supportFile', this.supportFileOperator);
    dataOperator.append('startDate', this.dataOperatorsWorkSpace.startDate);
    dataOperator.append('endDate', this.dataOperatorsWorkSpace.endDate);
    dataOperator.append('numberParcelsExpected', this.dataOperatorsWorkSpace.numberParcelsExpected);
    dataOperator.append('operatorCode', this.dataOperatorsWorkSpace.operatorCode);
    dataOperator.append('workArea', this.dataOperatorsWorkSpace.workArea);
    dataOperator.append('observations', this.dataOperatorsWorkSpace.observations);
    const numberAlphanumericParcels = Number.isInteger(this.dataOperatorsWorkSpace.numberParcelsExpected);
    const workArea = Number.isInteger(this.dataOperatorsWorkSpace.workArea);
    if (this.supportFileOperator === undefined) {
      this.toastr.error("No se ha cargado ningún soporte.");
    } else if (this.dataOperatorsWorkSpace.observations == '') {
      this.toastr.error("Las observaciones son obligatorias.");
    } else if (!numberAlphanumericParcels) {
      this.toastr.error("El número de predios a intervenir debe ser de tipo numérico.");
    } else if (this.dataOperatorsWorkSpace.numberParcelsExpected < 0) {
      this.toastr.error("El número de predios no es correcto.");
    } else if (!workArea) {
      this.toastr.error("El área de trabajo debe ser de tipo numérico.");
    } else if (this.dataOperatorsWorkSpace.workArea < 0) {
      this.toastr.error("El área de trabajo no es correcta.");
    }
    else {
      this.serviceWorkspaces.assingOperatorToWorkSpace(this.idWorkspace, dataOperator).subscribe(
        response => {
          this.toastr.success('Operador asignado satisfactoriamente');
          this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
            (response: any) => {
              this.idWorkspace = response.id;
              this.serviceWorkspaces.getWorkSpace(this.idWorkspace).subscribe(
                response => {
                  this.dataWorkSpace = response;
                  if (this.dataWorkSpace.operators.length > 0) {
                    this.replaceOperator = true;
                    this.dataOperatorsWorkSpace = this.dataWorkSpace.operators[0];
                    this.dataOperatorsWorkSpace.startDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.startDate);
                    this.dataOperatorsWorkSpace.endDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.endDate);
                  }
                }
              );
            }
          );
        }
      );
    }
  }
  closeModal(option: boolean, modal: string) {
    if (option) {
      this.assingOperatorInWorkSpace();
    }
    this.modalService.close(modal);
  }
  openModal(modal: string) {
    this.modalService.open(modal);
  }
  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.update();
    }
  }
  downloadSupplies(idSupport: number) {
    this.serviceWorkspaces.downloadSupport(this.idWorkspace, idSupport).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'soporte.zip');
      }
    );
  }
}
