import { statesProductsEnum } from './../../sections/quality-module/models/states-products.enum';
import * as _moment from 'moment';
import { Injectable } from '@angular/core';
import { statesDeliveriesEnum } from 'src/app/sections/quality-module/models/states-deliveries.enum';

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
      case statesDeliveriesEnum.BORRADOR:
        return '<span class="badge badge-secondary">BORRADOR</span>';
      case statesDeliveriesEnum.ENTREGADO:
        return '<span class="badge badge-primary">ENTREGADO</span>';
      case statesDeliveriesEnum.EN_REVISION:
        return '<span class="badge badge-info">EN REVISIÓN</span>';
      case statesDeliveriesEnum.EN_CORRECCION:
        return '<span class="badge badge-warning">EN CORRECCIÓN</span>';
      case statesDeliveriesEnum.ACEPTADO:
        return '<span class="badge badge-success">ACEPTADO</span>';
      case statesDeliveriesEnum.RECHAZADO:
        return '<span class="badge badge-danger">RECHAZADO</span>';
      default:
        return '';
    }
  }
  static nameDeliveryProductStatusId(deliveryProductStatusId: number): string {
    switch (deliveryProductStatusId) {
      case statesProductsEnum.PENDIENTE:
        return '<span class="badge badge-secondary">PENDIENTE</span>';
      case statesProductsEnum.ACEPTADO:
        return '<span class="badge badge-primary">ACEPTADO</span>';
      case statesProductsEnum.RECHAZADO:
        return '<span class="badge badge-info">RECHAZADO</span>';
      default:
        return '';
    }
  }
}
