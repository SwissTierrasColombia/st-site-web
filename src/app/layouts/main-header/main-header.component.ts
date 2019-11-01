import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/template/app.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  isCollapsed = true;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
