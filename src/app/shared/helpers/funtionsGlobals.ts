import { StatesProductsEnum } from './../../sections/quality-module/models/states-products.enum';
import * as _moment from 'moment';
import { Injectable } from '@angular/core';
import { StatesDeliveriesEnum } from 'src/app/sections/quality-module/models/states-deliveries.enum';

const moment = _moment;

@Injectable()
export class FuntionsGlobalsHelper {
  static clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  static formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  static formatDateIntegration(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  static formatDateCalendar(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  static itemToLowerCase(item: string) {
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  }
  static nameStateDelivery(deliveryStatusId: number): string {
    switch (deliveryStatusId) {
      case StatesDeliveriesEnum.BORRADOR:
        return '<span class="badge badge-secondary">BORRADOR</span>';
      case StatesDeliveriesEnum.ENTREGADO:
        return '<span class="badge badge-primary">ENTREGADO</span>';
      case StatesDeliveriesEnum.EN_REVISION:
        return '<span class="badge badge-info">EN REVISIÓN</span>';
      case StatesDeliveriesEnum.EN_CORRECCION:
        return '<span class="badge badge-warning">EN CORRECCIÓN</span>';
      case StatesDeliveriesEnum.ACEPTADO:
        return '<span class="badge badge-success">ACEPTADO</span>';
      case StatesDeliveriesEnum.RECHAZADO:
        return '<span class="badge badge-danger">RECHAZADO</span>';
      default:
        return '';
    }
  }
  static nameDeliveryProductStatusId(deliveryProductStatusId: number): string {
    switch (deliveryProductStatusId) {
      case StatesProductsEnum.PENDIENTE:
        return '<span class="badge badge-secondary">PENDIENTE</span>';
      case StatesProductsEnum.ACEPTADO:
        return '<span class="badge badge-primary">ACEPTADO</span>';
      case StatesProductsEnum.RECHAZADO:
        return '<span class="badge badge-info">RECHAZADO</span>';
      default:
        return '';
    }
  }
}
