import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-deliveries',
  templateUrl: './tabs-deliveries.component.html',
  styleUrls: ['./tabs-deliveries.component.scss'],
})
export class TabsDeliveriesComponent implements OnInit {
  tab: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
