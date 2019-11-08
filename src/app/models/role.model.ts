import { Injectable } from '@angular/core';

@Injectable()
export class RoleModel {

  Administrador: string;
  Ciudadano: string;
  Consultor: string;
  Entidad: string;
  Notario: string;
  Notificador: string;
  Radicador: string;

  constructor() {
    this.Administrador = "5d710564330f7d7cd67ee491";
    this.Ciudadano = "5d7105cb698085331067bf8f";
    this.Consultor = "5d7274d6e3f885b775d877f5";
    this.Entidad = "5d7107e7a6a3e77e5fe15217";
    this.Notario = "5d7143a135d95d7fef75b70b";
    this.Notificador = "5d7274ecfa0f0048ed4e8e84";
    this.Radicador = "5d7274bd35c6b3fea68d70a0";
  }

}
