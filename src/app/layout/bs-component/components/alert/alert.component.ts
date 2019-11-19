import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: Array<any> = [];
  constructor() {
    this.alerts.push({
      id: 1,
      type: 'success',
      message: 'Esta es una alerta de éxito',
    }, {
      id: 2,
      type: 'info',
      message: 'Esta es una alerta de información',
    }, {
      id: 3,
      type: 'warning',
      message: 'Esta es una alerta de advertencia',
    }, {
      id: 4,
      type: 'danger',
      message: 'Esta es una alerta de peligro',
    });
  }

  ngOnInit() { }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
