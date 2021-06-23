import { TypeProduct } from './../models/type-product.interface';
import { ManagerProductInterface } from '../models/manager-product.interface';
import { Component, OnInit } from '@angular/core';
import { LevCatReceptionService } from '../lev-cat-reception.service';
import { FindProductsFromManagerInterface } from '../models/find-products-from-manager.interface';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  id: number = 0;
  data: ManagerProductInterface;
  formOk: boolean = false;
  editMode: boolean = false;
  listProducts: FindProductsFromManagerInterface[] = [];
  optionModalRef: NgbModalRef;
  typeProduct: TypeProduct[] = [];
  constructor(
    private levCatReceptionService: LevCatReceptionService,
    private modalService: NgbModal,
    private scroll: ViewportScroller,
    private toastr: ToastrService
  ) {
    this.data = {
      name: '',
      isXTF: false,
      description: '',
    };
    this.typeProduct = [
      {
        id: true,
        name: 'XTF',
      },
      {
        id: false,
        name: 'Otro',
      },
    ];
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.levCatReceptionService
      .findProductsFromManager()
      .subscribe((element) => {
        this.listProducts = element;
      });
  }
  changeState(): void {
    console.log(this.data);

    this.formOk = false;
    if (this.data.name !== '' && this.data.description !== '') {
      this.formOk = true;
    }
  }
  create(): void {
    this.levCatReceptionService.createProduct(this.data).subscribe((_) => {
      this.data = {
        name: '',
        isXTF: false,
        description: '',
      };
      this.formOk = false;
      this.getProducts();
      this.toastr.success('Producto creado');
    });
  }
  updateProduct(): void {
    let dataUpdate: ManagerProductInterface = {
      name: this.data.name,
      description: this.data.description,
      isXTF: this.data.isXTF,
    };
    this.levCatReceptionService
      .updateProduct(this.data.id, dataUpdate)
      .subscribe((_) => {
        this.toastr.success('Producto: ' + this.data.id + ' actualizado');
        this.cancel();
      });
  }
  cancel(): void {
    this.id = 0;
    this.data = {
      name: '',
      isXTF: false,
      description: '',
    };
    this.formOk = false;
    this.editMode = false;
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  editProduct(item: ManagerProductInterface) {
    this.editMode = true;
    this.data = item;
    this.id = item.id;
    this.scroll.scrollToAnchor('actionForm');
  }
  openModalRemoveProduct(productId: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de Eliminar el Producto?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va ha eliminar un producto.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService
            .removeProduct(productId)
            .subscribe((_) => {
              this.listProducts = this.listProducts.filter(
                (item) => item.id != productId
              );
              this.toastr.success('Producto eliminado');
            });
        }
      }
    });
  }
}
