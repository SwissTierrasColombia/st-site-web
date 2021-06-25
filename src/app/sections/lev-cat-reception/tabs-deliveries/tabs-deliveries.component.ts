import { rolesEnum } from './../../../shared/models/roles.enum';
import { DecodedTokenInterface } from './../../../shared/models/decoded-token.interface';
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tabs-deliveries',
  templateUrl: './tabs-deliveries.component.html',
  styleUrls: ['./tabs-deliveries.component.scss'],
})
export class TabsDeliveriesComponent implements OnInit {
  tab: number = 1;
  user: DecodedTokenInterface;
  isManager: boolean = false;
  isOperator: boolean = false;
  constructor(private activedRoute: ActivatedRoute) {}

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
    this.activedRoute.params.subscribe((params: Params) => {
      if (params.tab && params.tab != '0') {
        this.tab = Number(params.tab);
      }
    });
  }
}
