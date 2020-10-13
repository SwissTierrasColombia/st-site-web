import * as _moment from 'moment';
import { Injectable } from '@angular/core';

const moment = _moment;

@Injectable()
export class FuntionsGlobalsHelper {

  static clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  static formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('Do MMM YYYY');
  }
  static formatDateIntegration(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  static formatDateCalendar(date: string) {
    moment.locale('es');
    return moment(date).format('Do MMM YYYY');
  }
  static itemToLowerCase(item: string) {
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  }
}
