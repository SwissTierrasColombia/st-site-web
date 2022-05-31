import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-periods',
  templateUrl: './create-periods.component.html',
  styleUrls: ['./create-periods.component.scss'],
})
export class CreatePeriodsComponent implements OnInit {
  listYears = [];
  selectYear = 0;
  numPeriod = 0;
  observations = '';
  constructor() {}

  ngOnInit(): void {}

  save() {}
  cancel() {}
}
