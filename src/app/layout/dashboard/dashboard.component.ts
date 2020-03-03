import { Component, OnInit } from '@angular/core';
import { slideToBottom } from '../../router.animations';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideToBottom()]
})
export class DashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  dataRequestPending: number;
  user: any;
  roleproveedor: any;
  allroles: any;

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

    this.alerts.push(
      {
        id: 1,
        type: 'success',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      },
      {
        id: 2,
        type: 'warning',
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
      }
    );
    this.dataRequestPending = 0;
    this.user = {};
    this.allroles = {};
    this.roleproveedor = {
      id: 0
    };
  }

  ngOnInit() {
    this.user = JwtHelper.getUserPublicInformation();
    this.roleproveedor = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.proveedor;
    });
    if (this.roleproveedor) {
      this.serviceWorkspaces.getPendingRequestByProvider().subscribe(
        (data: any) => {
          this.dataRequestPending = data.length;
        }
      );
    }
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
