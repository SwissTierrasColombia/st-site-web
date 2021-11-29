import { Injectable } from '@angular/core';
import { StateDeliveriesEnum } from '../models/state-delivery.enum';

const stateDeliveriesEnum = StateDeliveriesEnum;
@Injectable()
export default class Commons {

    public static nameStateDelivery(deliveryStatusId: string): string {
        switch (deliveryStatusId) {
            case stateDeliveriesEnum.DRAFT:
                return '<span class="badge badge-secondary">Borrador</span>';
            case stateDeliveriesEnum.IMPORTING:
                return '<span class="badge badge-primary">Importando</span>';
            case stateDeliveriesEnum.IN_QUEUE_TO_IMPORT:
                return '<span class="badge badge-info">Esperando para importación</span>';
            case stateDeliveriesEnum.SENT_CADASTRAL_AUTHORITY:
                return '<span class="badge badge-warning">Enviado Autoridad Catastral</span>';
            case stateDeliveriesEnum.SUCCESS_IMPORT:
                return '<span class="badge badge-success">Importación exitosa</span>';
            case stateDeliveriesEnum.FAILED_IMPORT:
                return '<span class="badge badge-danger">Fallo la importación</span>';
            default:
                return '';
        }
    }
}