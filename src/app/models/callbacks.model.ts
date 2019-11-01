import { Injectable } from '@angular/core';

@Injectable()
export class CallbacksModel {

    public CorreoElectronico: string;
    public MensajeTexto: string;
    public CambioPaso: string;

    constructor() {
        this.CorreoElectronico = "5d5c1484d4302ab4ff21ecdd";
        this.MensajeTexto = "5d5c148a0a2eacc6f388b2a1";
        this.CambioPaso = "5d5c149a82457777a6ad01c9";
    }

}
