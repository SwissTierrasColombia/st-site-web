import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
})
export class ProveedorComponent implements OnInit {
  @ViewChild('actionForm', { static: false }) actionForm: ElementRef;
  dataProfile: any;
  data: any;
  idProfileDelete: number;
  categoriesProviders: any;
  editMode: boolean;
  formOk: boolean;
  id: number;
  optionModalRef: NgbModalRef;
  constructor(
    private serviceProvider: ProvidersService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {
    this.dataProfile = [];
    this.data = {
      name: '',
      alias: '',
      taxIdentificationNumber: '',
      providerCategoryId: '0',
    };
    this.idProfileDelete = 0;
    this.categoriesProviders = [];
    this.editMode = false;
    this.formOk = false;
    this.id = 0;
  }
  ngOnInit(): void {
    this.serviceProvider.getProviders().subscribe((element) => {
      this.dataProfile = element;
      this.dataProfile.sort((a, b) => a.id - b.id);
    });
    this.serviceProvider.getCategoriesProviders().subscribe((response) => {
      this.categoriesProviders = response;
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
      this.data.providerCategoryId !== '0'
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
    const entity = this.clone(item);
    this.id = entity.id;
    this.data = {
      id: entity.id,
      name: entity.name,
      alias: entity.alias,
      taxIdentificationNumber: entity.taxIdentificationNumber,
      providerCategoryId: entity.providerCategory.id,
    };
    this.actionForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    this.editMode = true;
  }
  deleteProfile(id: number) {
    this.idProfileDelete = id;
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de Eliminar el Proveedor?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción eliminará el Proveedor.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceProvider
            .deleteProvider(this.idProfileDelete)
            .subscribe((_) => {
              this.toast.success('Ha eliminado correctamente el proveedor.');
              this.idProfileDelete = 0;
              this.serviceProvider.getProviders().subscribe((element) => {
                this.dataProfile = element;
                this.dataProfile.sort((a, b) => a.id - b.id);
              });
            });
        }
      }
    });
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

  create() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceProvider.createProvider(this.data).subscribe((element) => {
        this.dataProfile.push(element);
        this.cancel();
        this.toast.success('Se ha creado el proveedor correctamente.');
      });
    } else {
      this.toast.error(
        'Formato invalido del Número de Identificación Tributaria (NIT)'
      );
      this.formOk = false;
    }
  }
  save() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceProvider.updateProvider(this.data).subscribe((_) => {
        this.toast.success('Se ha actualizado el proveedor correctamente.');
        this.cancel();
        this.serviceProvider.getProviders().subscribe((element) => {
          this.dataProfile = element;
          this.dataProfile.sort((a, b) => a.id - b.id);
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
    };
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  openModalActiveProvider(providerId?: number, index?: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de activar el proveedor?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción habilita el proveedor y le permitirá la visualización en el sistema.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceProvider
            .enableProvider(providerId)
            .subscribe((response) => {
              this.dataProfile[index] = response;
              this.toast.success('Ha habilitado correctamente el proveedor.');
            });
        }
      }
    });
  }

  openModalDisableProvider(providerId?: number, index?: number) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de desactivar el proveedor?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción deshabilita el proveedor y no lo dejara visualizar en el sistema.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceProvider
            .disableProvider(providerId)
            .subscribe((response) => {
              this.dataProfile[index] = response;
              this.toast.success('Ha desactivado correctamente el proveedor.');
            });
        }
      }
    });
  }
}
