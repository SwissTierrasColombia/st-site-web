import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { slideToLeft } from 'src/app/router.animations';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [slideToLeft()]
})
export class ListUserComponent implements OnInit {

  dataListUser: any;
  page: number;
  pageSize: number;
  searchText: string;
  constructor(
    private serviceAdministration: AdministrationService,
  ) {
    this.dataListUser = [];
    this.page = 1;
    this.pageSize = 10;
  }

  ngOnInit() {
    this.serviceAdministration.getAllUsers()
      .subscribe(arg => {
        this.dataListUser = arg
      });
  }

  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  globalFuntionString(item: string) {
    return FuntionsGlobalsHelper.itemToLowerCase(item);
  }
}
