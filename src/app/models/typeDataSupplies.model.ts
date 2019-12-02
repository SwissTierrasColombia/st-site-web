import { Injectable } from '@angular/core';

@Injectable()
export class TypeDataSuppliesModel {

  public typeDataFile: string;
  public typeDataUrl: string;
  public typeDataNone: string;

  constructor() {
    this.typeDataFile = 'file';
    this.typeDataUrl = 'url';
    this.typeDataNone = 'none';
  }

}
