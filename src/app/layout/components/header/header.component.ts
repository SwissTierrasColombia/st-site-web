import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelper } from 'src/app/helpers/jwt';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  user: any;
  numtask: number;
  constructor(
    public router: Router,
    private serviceWorkspaces: WorkspacesService,
  ) {
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
    this.numtask = 0;
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.user = JwtHelper.getUserPublicInformation();
    this.serviceWorkspaces.GetPendingTasksUser().subscribe(
      (response: any) => {
        this.numtask = response.length;
      }
    );
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
    this.router.navigate(['login']);
  }


}
