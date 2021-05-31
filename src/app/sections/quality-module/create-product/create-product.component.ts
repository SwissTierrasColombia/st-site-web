import { CreateProductInterface } from './../models/create-product.interface';
import { Component, OnInit } from '@angular/core';
import { QualityService } from '../quality.service';
import { findProductsFromManagerInterface } from '../models/find-products-from-manager.interface';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  id: number = 0;
  data: CreateProductInterface;
  formOk: boolean = false;
  editMode: boolean = false;
  listProducts: findProductsFromManagerInterface[] = [];
  constructor(private qualityService: QualityService) {
    this.data = {
      name: '',
      isXTF: false,
      description: '',
    };
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.qualityService.findProductsFromManager().subscribe((element) => {
      this.listProducts = element;
    });
  }
  changeState(): void {
    this.formOk = false;
    if (this.data.name !== '' && this.data.description !== '') {
      this.formOk = true;
    }
  }
  create(): void {
    this.qualityService.createProduct(this.data).subscribe((_) => {
      this.data = {
        name: '',
        isXTF: false,
        description: '',
      };
      this.formOk = false;
      this.getProducts();
    });
  }
  save(): void {}
  cancel(): void {
    this.data = {
      name: '',
      isXTF: false,
      description: '',
    };
    this.formOk = false;
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
}
