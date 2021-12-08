import { Component, OnInit } from '@angular/core';
import { LevCatReceptionService } from 'src/app/sections/lev-cat-reception/lev-cat-reception.service';
import { StatesDeliveriesEnum } from 'src/app/sections/lev-cat-reception/models/states-deliveries.enum';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
  numRevision: number;
  deliveryInDraft: number = 0;
  deliveryInCorrection: number = 0;
  deliveryInPending: number = 0;
  deliveryInRevision: number = 0;
  isManager: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel,
    private levCatReceptionService: LevCatReceptionService
  ) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider1.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider4.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider5.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider6.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider7.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider8.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider9.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      },
      {
        imagePath: 'assets/images/slider10.jpg',
        label: 'Sistema de Transición',
        text: 'Sistema de Transición para el Levantamiento Catastral en Colombia',
      }
    );
    this.taskProvider = 0;
    this.taskOperator = 0;
    this.user = {};
    this.allroles = {};
    this.roleproveedor = {
      id: 0,
    };
    this.roleoperator = {
      id: 0,
    };
    this.numRevision = 0;
  }

  ngOnInit() {
    this.user = JwtHelper.getUserPublicInformation();
    this.roleproveedor = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.proveedor;
    });
    this.roleoperator = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.operador;
    });
    this.isManager = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.gestor;
    });
    if (this.user.provider_sub_roles) {
      this.delegate = this.user.provider_sub_roles.find((elem: any) => {
        return elem.id === 2;
      });
    }
    if (
      this.roleproveedor &&
      this.user.is_provider_director === false &&
      !this.delegate
    ) {
      this.serviceWorkspaces
        .getPendingRequestByProvider()
        .subscribe((data: any) => {
          this.taskProvider = data.length;
        });
    }
    if (this.roleoperator) {
      this.serviceWorkspaces
        .GetDeliveriesToOperator()
        .subscribe((response: any) => {
          this.taskOperator = response.length;
        });
      this.findDeliveryReceptionLevCat(StatesDeliveriesEnum.BORRADOR);
      this.findDeliveryReceptionLevCat(StatesDeliveriesEnum.EN_CORRECCION);
    }
    if (this.delegate) {
      this.serviceWorkspaces
        .GetSuppliesRequestedToReview()
        .subscribe((data: any) => {
          this.numRevision = data.length;
        });
    }
    if (this.isManager) {
      this.findDeliveryReceptionLevCat(StatesDeliveriesEnum.ENTREGADO);
      this.findDeliveryReceptionLevCat(
        StatesDeliveriesEnum.EN_REVISION +
          ',' +
          StatesDeliveriesEnum.EN_CORRECCION
      );
    }
  }
  findDeliveryReceptionLevCat(status: string | number) {
    this.levCatReceptionService
      .findDeliveries(status, 1, 1)
      .subscribe((response) => {
        if (status == StatesDeliveriesEnum.BORRADOR) {
          this.deliveryInDraft = response.totalElements;
        }
        if (status == StatesDeliveriesEnum.EN_CORRECCION) {
          this.deliveryInCorrection = response.totalElements;
        }
        if (status == StatesDeliveriesEnum.ENTREGADO) {
          this.deliveryInPending = response.totalElements;
        }
        if (
          status ==
          StatesDeliveriesEnum.EN_REVISION +
            ',' +
            StatesDeliveriesEnum.EN_CORRECCION
        ) {
          this.deliveryInRevision = response.totalElements;
        }
      });
  }
  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
