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
    public static nameStateFile(fileId: string): string {
        switch (fileId) {
            case StateFilesEnum.IMPORTING:
                return '<span class="badge badge-secondary">Importando</span>';
            case StateFilesEnum.IMPORT_SUCCESSFUL:
                return '<span class="badge badge-primary">Importación exitosa</span>';
            case StateFilesEnum.IMPORT_UNSUCCESSFUL:
                return '<span class="badge badge-info">Fallo la importación</span>';
            case StateFilesEnum.IN_VALIDATION:
                return '<span class="badge badge-warning">En Validación</span>';
            case StateFilesEnum.SUCCESSFUL:
                return '<span class="badge badge-success">Exitoso</span>';
            case StateFilesEnum.UNSUCCESSFUL:
                return '<span class="badge badge-danger">Fallo</span>';
            default:
                return '';
        }
    }
}