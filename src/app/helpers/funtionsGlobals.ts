import * as _moment from 'moment';
import { Injectable } from '@angular/core';

const moment = _moment;

@Injectable()
export class FuntionsGlobalsHelper {

  static clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  static formatDate(date: string) {
    return moment(date).format('DD-MMM-YYYY h:mm:ss');
  }
  static formatDateCalendar(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
  static itemToLowerCase(item: string) {
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  }
}
