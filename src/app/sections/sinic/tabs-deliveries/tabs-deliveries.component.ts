import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { DecodedTokenInterface } from 'src/app/shared/models/decoded-token.interface';
import { rolesEnum } from 'src/app/shared/models/roles.enum';

@Component({
  selector: 'app-tabs-deliveries',
  templateUrl: './tabs-deliveries.component.html',
  styleUrls: ['./tabs-deliveries.component.scss']
})
export class TabsDeliveriesComponent implements OnInit {
  tab: number = 1;
  user: DecodedTokenInterface;
  isManager: boolean = false;
  isAdministrator: boolean = false;
  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JwtHelper.getUserPublicInformation();
    this.isAdministrator = !!this.user.roles.find((element) =>
      element.id === rolesEnum.administrador ? true : false
    );
    this.isManager = !!this.user.roles.find((element) =>
      element.id === rolesEnum.gestor ? true : false
    );
    if (this.isAdministrator) {
      this.tab = 2;
    }
    if (this.isManager) {
      this.tab = 1;
    }
    this.activedRoute.params.subscribe((params: Params) => {
      if (params.tab && params.tab != '0') {
        this.tab = Number(params.tab);
      }
    });
  }
}
