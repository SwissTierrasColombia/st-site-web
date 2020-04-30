import { Injectable } from '@angular/core';

@Injectable()
export class RoleModel {

  superAdministrador: number;
  administrador: number;
  gestor: number;
  operador: number;
  proveedor: number;

  constructor() {
    this.administrador = 1;
    this.gestor = 2;
    this.operador = 3;
    this.proveedor = 4;
    this.superAdministrador = 5;
  }

}
