import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { SinicService } from './../sinic.service';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {
  departments: any = [];
  selectDepartment: string = '0';
  municipalities: any = [];
  selectMunicipality: string = '0';
  observations: string = '';
  createActive: boolean = false;
  optionModalRef: NgbModalRef;
  listDeliveryFormat = [{
    id: 'XTF',
    name: 'Archivo XTF'
  },
  {
    id: 'FLAT',
    name: 'Archivos Planos'
  }];
  deliveryFormat = '0';
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private sinicService: SinicService,
    private modalService: NgbModal,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.departments = response;
    });
  }

  changeDepartament() {
    this.municipalities = []
    this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(Number(this.selectDepartment))
      .subscribe((data) => {
        data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
        for (const iterator of data) {
          this.municipalities.push({
            id: iterator.code,
            name: iterator.name,
          });
        }
      });
  }
  change() {
    this.createActive = false;
    if (
      this.selectDepartment !== '0' &&
      this.selectMunicipality !== '0' &&
      this.deliveryFormat !== '0' &&
      this.observations !== ''
    ) {
      this.createActive = true;
    }
  }
  openModalCreateDelivery() {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Desea crear un borrador de entrega?';
    this.optionModalRef.componentInstance.description =
      `Advertencia: Una vez seleccionado el formato de entrega ${this.deliveryFormat == '1' ? '[Archivo XTF]' : '[Archivo Planos]'} no podrá ser modificado.`;
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          // add deliveryFormat
          let data = {
            municipalityCode: this.selectMunicipality,
            observations: this.observations,
            type: this.deliveryFormat
          };
          this.sinicService.createDelivery(data).subscribe((_) => {
            this.municipalities = [];
            this.selectMunicipality = '0';
            this.selectDepartment = '0';
            this.deliveryFormat = '0';
            this.observations = '';
            this.toastr.success('Ha creado una entrega');
            this.createActive = false;
          });
        }
      }
    });
  }
}
