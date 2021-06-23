import { rolesEnum } from './../../../shared/models/roles.enum';
import { DecodedTokenInterface } from './../../../shared/models/decoded-token.interface';
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'src/app/shared/helpers/jwt';

@Component({
  selector: 'app-tabs-deliveries',
  templateUrl: './tabs-deliveries.component.html',
  styleUrls: ['./tabs-deliveries.component.scss'],
})
export class TabsDeliveriesComponent implements OnInit {
  tab: number;
  user: DecodedTokenInterface;
  isManager: boolean = false;
  isOperator: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.user = JwtHelper.getUserPublicInformation();
    this.isOperator = !!this.user.roles.find((element) =>
      element.id === rolesEnum.operador ? true : false
    );
    this.isManager = !!this.user.roles.find((element) =>
      element.id === rolesEnum.gestor ? true : false
    );
    if (this.isOperator) {
      this.tab = 1;
    }
    if (this.isManager) {
      this.tab = 2;
    }
  }
}
