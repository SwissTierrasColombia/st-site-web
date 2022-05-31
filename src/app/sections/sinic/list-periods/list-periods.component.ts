import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss'],
})
export class ListPeriodsComponent implements OnInit {
  numPeriods = 1;
  listPeriods = [];
  constructor() {}

  ngOnInit(): void {
    this.listPeriods = [
      {
        age: 2022,
        numPeriod: 2,
        createdAt: '25/02/2022',
        observations: 'adsfasjfnasfjnasfnasjfnasjkfnask',
      },
    ];
  }

  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }

  load(item) {}
}
