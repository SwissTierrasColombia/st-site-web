import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelper } from 'src/app/helpers/jwt';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { RoleModel } from 'src/app/helpers/role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  user: any;
  taskProvider: number;
  roleproveedor: any;
  allroles: any;
  roleoperator: any;
  taskOperator: number;
  constructor(
    public router: Router,
    private serviceWorkspaces: WorkspacesService,
    private roles: RoleModel

  ) {
    this.taskProvider = 0;
    this.taskOperator = 0;
    this.allroles = {};
    this.roleproveedor = {
      id: 0
    };
    this.roleoperator = {
      id: 0
    };
    this.user = {
      first_name: 'user',
      last_name: ''
    };
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.user = JwtHelper.getUserPublicInformation();

    this.roleproveedor = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.proveedor;
    });
    this.roleoperator = this.user.roles.find((elem: any) => {
      return elem.id === this.roles.operador;
    });
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem(environment.nameTokenSession);
    window.location.reload();
  }
  toUpperCasetoLowerCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
