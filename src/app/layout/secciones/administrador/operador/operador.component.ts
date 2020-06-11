import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss']
})
export class OperadorComponent implements OnInit {
  @ViewChild('actionForm', { static: false }) actionForm: ElementRef;
  dataProfile: any;
  data: any;
  idProfileDelete: any;
  idProfileEnable: any;
  categoriesProviders: any;
  editMode: boolean;
  formOk: boolean;
  id: number;
  constructor(
    private serviceOperator: OperatorsService,
    private toast: ToastrService,
    private modalService: ModalService) {
    this.dataProfile = [];
    this.data = {
      name: "",
      taxIdentificationNumber: "",
      providerCategoryId: '0',
      isPublic: '0'
    }
    this.idProfileDelete = {};
    this.categoriesProviders = [];
    this.idProfileEnable = {};
    this.editMode = false;
    this.formOk = false;
    this.id = 0;
  }
  ngOnInit(): void {
    this.serviceOperator.getAllOperators().subscribe(
      element => {
        this.dataProfile = element;
        //console.log(this.dataProfile);

        //console.log(this.dataProfile);
        this.dataProfile.sort((a, b) => a.id - b.id);
        this.dataProfile.forEach(element => {
          if (element.operatorState.name == "INACTIVO") {
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
    if (this.data.name != "" &&
      this.data.taxIdentificationNumber != "" &&
      this.data.isPublic !== '0') {
      this.formOk = true;
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
      taxIdentificationNumber: entity.taxIdentificationNumber,
      isPublic: entity.isPublic
    }
    this.actionForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    this.editMode = true;
  }
  deleteProfile(modal: string, item: any) {
    this.modalService.open(modal)
    this.idProfileDelete = item;
  }
  closeModalDisabled(modal: string, option: boolean) {
    if (option) {
      this.serviceOperator.disableOperator(this.idProfileDelete.id).subscribe(
        _ => {
          this.toast.success("Ha desactivado correctamente el operador.");
          this.idProfileDelete.state = false;
          this.idProfileDelete = {};
        }
      );
      this.modalService.close(modal);
    } else {
      this.idProfileDelete.state = true;
      this.modalService.close(modal);
    }
  }
  closeModalEnable(modal: string, option: boolean) {
    if (option) {
      this.serviceOperator.enableOperator(this.idProfileEnable.id).subscribe(
        _ => {
          this.toast.success("Ha habilitado correctamente el operador.");
          this.idProfileEnable.state = true;
          this.idProfileEnable = {};
        }
      );
      this.modalService.close(modal);
    } else {
      //console.log(this.idProfileEnable);
      this.idProfileEnable.state = false;
      this.modalService.close(modal);
    }
  }
  activeManager(modal: string, item: any) {
    this.modalService.open(modal)
    this.idProfileEnable = item;
  }
  clickCheckBox(event: Event) {
    event.preventDefault();
  }
  create() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceOperator.createOperator(this.data).subscribe(
        (element: any) => {
          element.state = true;
          this.dataProfile.push(element);
          this.cancel();
          this.toast.success("Se ha creado el operador correctamente.");
        }
      );
    } else {
      this.toast.error("Formato invalido del Número de Identificación Tributaria (NIT)");
    }
  }
  save() {
    if (this.nitIsValid(this.data.taxIdentificationNumber)) {
      this.serviceOperator.updateOperator(this.data).subscribe(
        _ => {
          this.toast.success("Se ha actualizado el operador correctamente.");
          this.cancel();
          this.serviceOperator.getAllOperators().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
              this.dataProfile.forEach(element => {
                if (element.operatorState.name == "INACTIVO") {
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
  cancel() {
    this.id = 0;
    this.editMode = false;
    this.formOk = false;
    this.data = {
      name: "",
      taxIdentificationNumber: "",
      providerCategoryId: '0',
      isPublic: '0'
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
