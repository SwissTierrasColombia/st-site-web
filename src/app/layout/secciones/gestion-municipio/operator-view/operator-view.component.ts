import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';

const moment = _moment;

@Component({
  selector: 'app-operator-view',
  templateUrl: './operator-view.component.html',
  styleUrls: ['./operator-view.component.scss'],
  animations: [routerTransition()]
})

export class OperatorViewComponent implements OnInit {

  dataWorkSpace: any;
  tab: number;
  departaments: any;
  munucipalities: any;
  selectDepartment: number;
  selectMunicipality: number;
  idWorkspace: number;
  dataSoports: any;
  selectOperator: number;
  dataOperatorsWorkSpace: any;
  supportFileOperator: File;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
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
    this.dataSoports = [];
    this.selectOperator = 0;
    this.dataOperatorsWorkSpace = {
      startDate: '',
      endDate: '',
      numberParcelsExpected: '',
      workArea: '',
      observations: '',
      operatorCode: 0,
      operatorName: ''
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
          if (this.dataWorkSpace.operators.length > 0) {
            this.dataOperatorsWorkSpace = this.dataWorkSpace.operators[0];
            this.dataOperatorsWorkSpace.operatorName = this.dataWorkSpace.operators[0].operator.name;
            this.dataOperatorsWorkSpace.startDate = this.formatDate(this.dataOperatorsWorkSpace.startDate);
            this.dataOperatorsWorkSpace.endDate = this.formatDate(this.dataOperatorsWorkSpace.endDate);
          }
        }
      );
    });
  }

  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  volver() {
    this.router.navigate(['/gestion/workspace']);
  }
  getSopports() {
    this.tab = 2;
    this.serviceWorkspaces.getSupportsByWorkSpace(this.idWorkspace).subscribe(response => {
      this.dataSoports = response;

    });
  }
}
