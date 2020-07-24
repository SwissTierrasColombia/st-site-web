import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  taskProvider: number;
  user: any;
  roleproveedor: any;
  allroles: any;
  roleoperator: any;
  taskOperator: number;
  delegate: any;

  constructor(
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel
  ) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider1.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider4.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider5.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider6.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider7.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider8.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider9.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      },
      {
        imagePath: 'assets/images/slider10.jpg',
        label: 'Sistema de Transición',
        text:
          'Sistema de Transición para el Barrido Predial en Colombia'
      }
    );
    this.taskProvider = 0;
    this.taskOperator = 0;
    this.user = {};
    this.allroles = {};
    this.roleproveedor = {
      id: 0
    };
    this.roleoperator = {
      id: 0
    };
  }

  ngOnInit() {
    this.user = JwtHelper.getUserPublicInformation();
    this.roleproveedor = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.proveedor;
    });
    this.roleoperator = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.operador;
    });
    if (this.user.provider_sub_roles) {
      this.delegate = this.user.provider_sub_roles.find((elem: any) => {
        return elem.id === 2;
      });
    }
    if (this.roleproveedor && this.user.is_provider_director === false && !this.delegate) {
      this.serviceWorkspaces.getPendingRequestByProvider().subscribe(
        (data: any) => {
          this.taskProvider = data.length;
        }
      );
    }
    if (this.roleoperator) {
      this.serviceWorkspaces.GetDeliveriesToOperator().subscribe(
        (response: any) => {
          this.taskOperator = response.length;
        }
      );
    }
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
