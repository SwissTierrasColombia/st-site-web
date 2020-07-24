import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  pushRightClass: string;
  showMenu: string;
  listMenu: any;
  user: any;
  allroles: any;
  roleAdmin: any;
  rolegestor: any;
  roleoperador: any;
  roleproveedor: any;
  delegate: any;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  administration: any;

  constructor(
    public router: Router,
    private roles: RoleModel
  ) {
    this.user = {
      first_name: 'Usuario',
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
    this.listMenu = [
      {
        gestion: 'gestion',
        insumos: 'insumos',
        operacion: 'operacion',
        calidad: 'calidad',
        tramites: 'tramites',
        administrador: 'administrador',
        insumosSolicitudes: 'insumosSolicitudes',
        caracterizacion: 'caracterizacion',
        registrar: 'registrar',
        busqueda: 'busqueda'
      }
    ];
    this.allroles = {};
    this.roleAdmin = {
      id: 0
    };
    this.rolegestor = {
      id: 0
    };
    this.roleoperador = {
      id: 0
    };
    this.roleproveedor = {
      id: 0
    };
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
  }

  ngOnInit() {
    this.allroles = this.roles;
    this.user = JwtHelper.getUserPublicInformation();
    this.roleAdmin = this.user.roles.find(elem => {
      return elem.id === this.roles.administrador;
    });
    this.rolegestor = this.user.roles.find(elem => {
      return elem.id === this.roles.gestor;
    });
    this.roleproveedor = this.user.roles.find(elem => {
      return elem.id === this.roles.proveedor;
    });
    this.roleoperador = this.user.roles.find(elem => {
      return elem.id === this.roles.operador;
    });
    this.administration = this.user.roles.find(elem => {
      return elem.id == this.roles.superAdministrador || elem.id == this.roles.administrador || (this.user.is_manager_director == this.roles.gestorDirector && elem.id == this.roles.gestor) || (this.user.is_provider_director == this.roles.proveedorDirector && elem.id == this.roles.proveedor);
    });
    if (this.user.provider_sub_roles) {
      this.delegate = this.user.provider_sub_roles.find((elem: any) => {
        return elem.id === 2;
      });
    }
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
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
