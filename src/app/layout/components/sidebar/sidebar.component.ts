import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelper } from 'src/app/helpers/jwt';

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

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(public router: Router) {
    this.user = {
      first_name: 'Usuario'
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
        administrador: 'administrador'
      }
    ];
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.user = JwtHelper.getUserPublicInformation();
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: string) {
    // console.log("element: ", element);
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
  }
}
