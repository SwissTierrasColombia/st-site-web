import { Injectable } from '@angular/core';
import { StateDeliveriesEnum } from '../models/state-delivery.enum';
import { StateFilesEnum } from '../models/state-file.enum';

const stateDeliveriesEnum = StateDeliveriesEnum;
const stateFilesEnum = StateFilesEnum;
@Injectable()
export default class Commons {

    public static nameStateDelivery(deliveryStatusId: string): string {
        switch (deliveryStatusId) {
            case stateDeliveriesEnum.DRAFT:
                return '<span class="badge badge-secondary">BORRADOR</span>';
            case stateDeliveriesEnum.IMPORTING:
                return '<span class="badge badge-primary">IMPORTANDO</span>';
            case stateDeliveriesEnum.IN_QUEUE_TO_IMPORT:
                return '<span class="badge badge-info">ESPERANDO PARA IMPORTACIÓN</span>';
            case stateDeliveriesEnum.SENT_CADASTRAL_AUTHORITY:
                return '<span class="badge badge-warning">ENVIADO AUTORIDAD CATASTRAL</span>';
            case stateDeliveriesEnum.SUCCESS_IMPORT:
                return '<span class="badge badge-success">IMPORTACIÓN EXITOSA</span>';
            case stateDeliveriesEnum.FAILED_IMPORT:
                return '<span class="badge badge-danger">FALLO LA IMPORTACIÓN</span>';
            default:
                return '';
        }
    }
    public static nameStateFile(fileId: string): string {
        switch (fileId) {
            case StateFilesEnum.IMPORTING:
                return '<span class="badge badge-secondary">IMPORTANDO</span>';
            case StateFilesEnum.IMPORT_SUCCESSFUL:
                return '<span class="badge badge-primary">IMPORTACIÓN EXITOSA</span>';
            case StateFilesEnum.IMPORT_UNSUCCESSFUL:
                return '<span class="badge badge-warning">FALLO LA IMPORTACIÓN</span>';
            case StateFilesEnum.IN_VALIDATION:
                return '<span class="badge badge-info">EN VALIDACIÓN</span>';
            case StateFilesEnum.SUCCESSFUL:
                return '<span class="badge badge-success">ACEPTADO</span>';
            case StateFilesEnum.UNSUCCESSFUL:
                return '<span class="badge badge-danger">RECHAZADO</span>';
            default:
                return '';
        }
    }
}