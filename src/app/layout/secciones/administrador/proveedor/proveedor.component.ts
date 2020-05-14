import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  @ViewChild('actionForm', { static: false }) actionForm: ElementRef;
  dataProfile: any;
  data: any;
  stateButton: boolean;
  idProfileDelete: number;
  activeButton: boolean;
  categoriesProviders: any;
  constructor(
    private serviceProvider: ProvidersService,
    private toast: ToastrService,
    private modalService: ModalService) {
    this.dataProfile = [];
    this.data = {
      name: "",
      taxIdentificationNumber: "",
      providerCategoryId: 0
    }
    this.stateButton = true;
    this.activeButton = true;
    this.idProfileDelete = 0;
    this.categoriesProviders = [];
  }
  ngOnInit(): void {
    this.serviceProvider.getProviders().subscribe(
      element => {
        this.dataProfile = element;
        this.dataProfile.sort((a, b) => a.id - b.id);
      }
    );
    this.serviceProvider.getCategoriesProviders().subscribe(
      response => { this.categoriesProviders = response }
    );
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeState() {
    if (this.data.name != "" && this.data.taxIdentificationNumber != "" || this.data.providerCategoryId != 0) {
      this.activeButton = false;
    }
  }
  submitChange() {
    if (this.stateButton) {
      this.serviceProvider.createProvider(this.data).subscribe(
        element => {
          this.dataProfile.push(element);
          this.data = {
            name: "",
            taxIdentificationNumber: "",
            providerCategoryId: 0
          }
          this.toast.success("Se ha creado el proveedor correctamente.");
          this.activeButton = true;
        }
      )
    } else {
      this.serviceProvider.updateProvider(this.data).subscribe(
        _ => {
          this.toast.success("Se ha actualizado el proveedor correctamente.");
          this.activeButton = true;
          this.stateButton = true;
          this.data = {
            name: "",
            taxIdentificationNumber: "",
            providerCategoryId: 0
          }
          this.serviceProvider.getProviders().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
            }
          );
        }
      );
    }
  }
  updateProfile(item: any) {
    this.stateButton = false;
    const entity = this.clone(item);
    //console.log(entity);

    this.data = {
      id: entity.id,
      name: entity.name,
      taxIdentificationNumber: entity.taxIdentificationNumber,
      providerCategoryId: entity.providerCategory.id
    }
    this.actionForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  deleteProfile(modal: string, id: number) {
    this.modalService.open(modal)
    this.idProfileDelete = id;
  }
  closeModalDisabled(modal: string, option: boolean) {
    if (option) {
      this.serviceProvider.deleteProvider(this.idProfileDelete).subscribe(
        _ => {
          this.toast.success("Ha eliminado correctamente el proveedor.");
          this.idProfileDelete = 0;
          this.serviceProvider.getProviders().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
            }
          );
        }
      );
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }

}
