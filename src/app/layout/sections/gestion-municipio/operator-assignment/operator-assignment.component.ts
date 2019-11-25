import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ManagersService } from 'src/app/services/gestion-municipio/managers.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';

const moment = _moment;
@Component({
  selector: 'app-operator-assignment',
  templateUrl: './operator-assignment.component.html',
  styleUrls: ['./operator-assignment.component.scss'],
  animations: [routerTransition()]
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
  supportFileOperator: File;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private serviceManagers: ManagersService,
    private toastr: ToastrService,
    private serviceOperators: OperatorsService
  ) {
    this.idWorkspace = 0;
    this.dataWorkSpace = {
      manager: {},
      municipality: {
        department: {}
      }
    };
    this.tab = 1;
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
      numberParcelsExpected: '',
      workArea: '',
      observations: '',
      operatorCode: 0
    };
  }

  ngOnInit() {
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departaments = response;
      });
    const promise1 = new Promise((resolve) => {
      this.activedRoute.params.subscribe(
        response => {
          resolve(response.idWorkspace);
        }
      );
    });
    Promise.all([promise1]).then((values: any) => {
      this.idWorkspace = values[0];
      this.serviceWorkspaces.getWorkSpace(values[0]).subscribe(
        response => {
          this.dataWorkSpace = response;
          console.log('this.dataWorkSpace', this.dataWorkSpace);
          this.dataOperatorsWorkSpace = this.dataWorkSpace.operators[0];
          this.dataOperatorsWorkSpace.startDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.startDate);
          this.dataOperatorsWorkSpace.endDate = this.formatDateCalendar(this.dataOperatorsWorkSpace.endDate);
        }
      );
    });
  }

  docSoport(files: FileList) {
    this.supportFileOperator = files[0];
  }

  formatDate(date: string) {
    return moment(date).format('DD-MMM-YYYY h:mm:ss');
  }
  formatDateCalendar(date: string) {
    return moment(date).format('YYYY-MM-DD');
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
    this.serviceWorkspaces.assingOperatorToWorkSpace(this.idWorkspace, dataOperator).subscribe(
      response => {
        console.log('assingOperatorToWorkSpace: ', response);
        this.toastr.success('Operador asignado satisfactoriamente');
      }
    );
  }
}
