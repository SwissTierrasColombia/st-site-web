import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss'],
})
export class OperadorComponent implements OnInit {
  dataProfile: any;
  data: any;
  idProfileDelete: any;
  idProfileEnable: any;
  categoriesProviders: any;
  editMode: boolean;
  formOk: boolean;
  id: number;
  optionModalRef: NgbModalRef;
  constructor(
    private serviceOperator: OperatorsService,
    private toast: ToastrService,
    private modalService: NgbModal,
    private scroll: ViewportScroller
  ) {
    this.dataProfile = [];
    this.data = {
      name: '',
      alias: '',
      taxIdentificationNumber: '',
      providerCategoryId: '0',
      isPublic: '0',
    };
    this.idProfileDelete = {};
    this.categoriesProviders = [];
    this.idProfileEnable = {};
    this.editMode = false;
    this.formOk = false;
    this.id = 0;
  }
  ngOnInit(): void {
    this.serviceOperator.getAllOperators().subscribe((element) => {
      this.dataProfile = element;

      this.dataProfile.sort((a, b) => a.id - b.id);
      this.dataProfile.forEach((element) => {
        if (element.operatorState.name == 'INACTIVO') {
          element.state = false;
        } else {
          element.state = true;
        }
      });
    });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeState() {
    if (
      this.data.name !== '' &&
      this.data.alias !== '' &&
      this.data.taxIdentificationNumber !== '' &&
      this.data.isPublic !== '0'
    ) {
      this.formOk = true;
      if (!this.nitIsValid(this.data.taxIdentificationNumber)) {
        this.formOk = false;
      }
    } else {
      this.formOk = false;
    }
  }
  updateProfile(item: any) {
    let entity = this.clone(item);
    this.id = entity.id;
    this.data = {
      id: entity.id,
      name: entity.name,
      alias: entity.alias,
      taxIdentificationNumber: entity.taxIdentificationNumber,
      isPublic: entity.isPublic,
    };
    this.scroll.scrollToAnchor('actionForm');
    this.editMode = true;
  }
  deleteProfile(item: any) {
    this.idProfileDelete = item;
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de Desactivar el Operador?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción deshabilita el Operador.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceOperator
            .disableOperator(this.idProfileDelete.id)
            .subscribe((_) => {
              this.toast.success('Ha desactivado correctamente el operador.');
              this.idProfileDelete.state = false;
              this.idProfileDelete = {};
            });
        } else {
          this.idProfileDelete.state = true;
        }
      }
    });
  }
  activeManager(item: any) {
    this.idProfileEnable = item;
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de Habilitar el Operador?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción habilita el Operador.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceOperator
            .enableOperator(this.idProfileEnable.id)
            .subscribe((_) => {
              this.toast.success('Ha habilitado correctamente el operador.');
              this.idProfileEnable.state = true;
              this.idProfileEnable = {};
            });
        } else {
          this.idProfileEnable.state = false;
        }
      }
    });
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  create() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceOperator
        .createOperator(this.data)
        .subscribe((element: any) => {
          element.state = true;
          this.dataProfile.push(element);
          this.cancel();
          this.toast.success('Se ha creado el operador correctamente.');
        });
    } else {
      this.toast.error(
        'Formato invalido del Número de Identificación Tributaria (NIT)'
      );
    }
  }
  save() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceOperator.updateOperator(this.data).subscribe((_) => {
        this.toast.success('Se ha actualizado el operador correctamente.');
        this.cancel();
        this.serviceOperator.getAllOperators().subscribe((element) => {
          this.dataProfile = element;
          this.dataProfile.sort((a, b) => a.id - b.id);
          this.dataProfile.forEach((element) => {
            if (element.operatorState.name == 'INACTIVO') {
              element.state = false;
            } else {
              element.state = true;
            }
          });
        });
      });
    } else {
      this.toast.error(
        'Formato invalido del Número de Identificación Tributaria (NIT)'
      );
      this.formOk = false;
    }
  }
  cancel() {
    this.id = 0;
    this.editMode = false;
    this.formOk = false;
    this.data = {
      name: '',
      alias: '',
      taxIdentificationNumber: '',
      providerCategoryId: '0',
      isPublic: '0',
    };
  }
  nitIsValid(dato) {
    const nit = dato.trim();
    if (nit.length === 10 || nit.length === 11) {
      var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');
      if (nitRegExp.test(nit)) {
        return true;
      }
    } else {
      this.toast.error(
        'El Número de Identificación Tributaria (NIT) no es correcto, ejemplo: XXXXXXXXX-Y'
      );
      this.formOk = false;
    }
  }
}
