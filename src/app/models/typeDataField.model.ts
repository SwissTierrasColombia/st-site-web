import { Injectable } from '@angular/core';

@Injectable()
export class TypeDataFieldModel {

    public typeDataText: string;
    public typeDataNumber: string;
    public typeDataEmail: string;
    public typeDataPhoneNumber: string;
    public typeDataDate: string;
    public typeDataSingleResponseList: string;
    public typeDataMultipleResponseList: string;
    public typeDataCheckbox: string;
    public typeDataFile: string;
    public typeDataTextarea: string;
    public typeDataUrl: string;

    constructor() {
        this.typeDataText = '5d519eb247943f3539d116ef';
        this.typeDataNumber = '5d519eb247943f3539d116f0';
        this.typeDataEmail = '5d5c174067bca9c43a6c0781';
        this.typeDataPhoneNumber = '5d5c17a7c5e62930e04c6f57';
        this.typeDataDate = '5d5c31053f13df7873bcdd7c';
        this.typeDataSingleResponseList = '5d6d14bdcf24455da624f3d2';
        this.typeDataMultipleResponseList = '5d6d14db839412978f3d657d';
        this.typeDataCheckbox = '5d6d158e15ba903fa8b8b5f5';
        this.typeDataFile = '5d6d20ef775e54cab6e1a7c3';
        this.typeDataTextarea = '5d6d41ebd3bc60802d460fcf';
        this.typeDataUrl = '5d6e64250b353073ccfa2d89';
    }

}
