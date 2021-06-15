import { Injectable } from '@angular/core';

@Injectable()
export class RoleModel {
  superAdministrador: number;
  administrador: number;
  gestor: number;
  operador: number;
  proveedor: number;
  gestorDirector: boolean;
  proveedorDirector: boolean;

  constructor() {
    this.administrador = 1;
    this.gestor = 2;
    this.operador = 3;
    this.proveedor = 4;
    this.superAdministrador = 5;
    this.gestorDirector = true;
    this.proveedorDirector = true;
  }
}
