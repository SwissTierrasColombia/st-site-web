import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  dataProfile: any;
  data: any;
  idProfileDelete: any;
  idProfileEnable: any;
  categoriesProviders: any;
  editMode: boolean;
  formOk: boolean;
  id: number;
  constructor(
    private serviceManager: ManagersService,
    private toast: ToastrService,
    private modalService: NgbModal,
    private scroll: ViewportScroller) {
    this.dataProfile = [];
    this.data = {
      name: "",
      taxIdentificationNumber: "",
      providerCategoryId: 0
    }
    this.idProfileDelete = {};
    this.categoriesProviders = [];
    this.idProfileEnable = {};
    this.editMode = false;
    this.formOk = false;
    this.id = 0;
  }
  ngOnInit(): void {
    this.serviceManager.getAllManagers().subscribe(
      element => {
        this.dataProfile = element;
        this.dataProfile.sort((a, b) => a.id - b.id);
        this.dataProfile.forEach(element => {
          if (element.managerState.name == "INACTIVO") {
            element.state = false;
          } else {
            element.state = true;
          }
        });
      }
    );
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeState() {
    this.formOk = false;
    if (this.data.name != "" &&
      this.data.taxIdentificationNumber != "") {
      this.formOk = true;
    }
  }
  updateProfile(item: any) {
    let entity = this.clone(item);
    this.id = entity.id;
    this.data = {
      id: entity.id,
      name: entity.name,
      taxIdentificationNumber: entity.taxIdentificationNumber
    }
    this.scroll.scrollToAnchor("actionForm");
    this.editMode = true;
  }
  deleteProfile(modal, item: any) {
    this.idProfileDelete = item;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalDisabled(option: boolean) {
    if (option) {
      this.serviceManager.disableManager(this.idProfileDelete.id).subscribe(
        _ => {
          this.toast.success("Ha desactivado correctamente el gestor.");
          this.idProfileDelete.state = false;
          this.idProfileDelete = {};
        }
      );
      this.modalService.dismissAll();
    } else {
      this.idProfileDelete.state = true;
      this.modalService.dismissAll();
    }
  }
  closeModalEnable(option: boolean) {
    if (option) {
      this.serviceManager.enableManager(this.idProfileEnable.id).subscribe(
        _ => {
          this.toast.success("Ha habilitado correctamente el gestor.");
          this.idProfileEnable.state = true;
          this.idProfileEnable = {};
        }
      );
      this.modalService.dismissAll();
    } else {
      this.idProfileEnable.state = false;
      this.modalService.dismissAll();
    }
  }
  activeManager(modal: any, item: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
    this.idProfileEnable = item;
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  cancel() {
    this.id = 0;
    this.editMode = false;
    this.formOk = false;
    this.data = {
      name: "",
      taxIdentificationNumber: "",
      providerCategoryId: 0
    }
  }
  create() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceManager.createManager(this.data).subscribe(
        (element: any) => {
          element.state = true;
          this.dataProfile.push(element);
          this.data = {
            name: "",
            taxIdentificationNumber: "",
            providerCategoryId: 0
          }
          this.toast.success("Se ha creado el gestor correctamente.");
          this.editMode = false;
          this.formOk = false;
        }
      );
    } else {
      this.toast.error("Formato invalido del Número de Identificación Tributaria (NIT)");
    }

  }
  save() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceManager.updateManager(this.data).subscribe(
        _ => {
          this.toast.success("Se ha actualizado el gestor correctamente.");
          this.cancel();
          this.serviceManager.getAllManagers().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
              this.dataProfile.forEach(element => {
                if (element.managerState.name == "INACTIVO") {
                  element.state = false;
                } else {
                  element.state = true;
                }
              });
            }
          );
        }
      );
    } else {
      this.toast.error("Formato invalido del Número de Identificación Tributaria (NIT)");
    }
  }
  nitIsValid(nit) {
    if (nit.length === 11) {
      var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');
      if (nitRegExp.test(nit)) {
        return true;
      }
    } else {
      this.toast.error("El Número de Identificación Tributaria (NIT) no es correcto, ejemplo: XXXXXXXXX-Y");
    }
  }
}
