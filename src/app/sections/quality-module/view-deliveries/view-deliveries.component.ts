import {
  findDeliveriesInterface,
  itemDelivery,
} from './../models/find-deliveries.interface';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { statesDeliveriesEnum } from '../models/states-deliveries.enum';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { getWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import { QualityService } from './../quality.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-view-deliveries',
  templateUrl: './view-deliveries.component.html',
  styleUrls: ['./view-deliveries.component.scss'],
})
export class ViewDeliveriesComponent implements OnInit, OnChanges {
  @Input() tab: number;
  @Input() isOperator: boolean = false;
  findDeliveries: findDeliveriesInterface;
  itemsDelivery: itemDelivery[] = [];
  dataWorkspacesByOperator: getWorkspacesByOperatorInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  managerCodeAndMunicipality: string = '0';
  page: number = 1;
  totalElements: number = 0;
  pageSize: number = 10;
  optionModalRef: NgbModalRef;
  status: string | number;
  constructor(
    private workspacesService: WorkspacesService,
    private qualityService: QualityService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOperator) {
      this.isOperator = changes.isOperator.currentValue;
    }
    if (changes.tab.currentValue === 1) {
      this.status = statesDeliveriesEnum.BORRADOR;
      this.changePage();
    }
    if (changes.tab.currentValue === 2) {
      this.status = statesDeliveriesEnum.ENTREGADO;
      this.changePage();
    }
    if (changes.tab.currentValue === 3) {
      this.status =
        statesDeliveriesEnum.EN_REVISION +
        ',' +
        statesDeliveriesEnum.EN_CORRECCION;
      this.changePage();
    }
    if (changes.tab.currentValue === 4) {
      this.status = statesDeliveriesEnum.EN_CORRECCION;
      this.changePage();
    }
    if (changes.tab.currentValue === 5) {
      this.status =
        statesDeliveriesEnum.ACEPTADO + ',' + statesDeliveriesEnum.RECHAZADO;
      this.changePage();
    }
  }

  ngOnInit(): void {
    if (this.isOperator) {
      this.workspacesService
        .getWorkspacesByOperator()
        .subscribe((response: getWorkspacesByOperatorInterface[]) => {
          this.dataWorkspacesByOperator = response;
          this.dataWorkspacesByOperator.forEach((element) => {
            this.listManagerWithMunicipality.push({
              id: element.managerCode + ' - ' + element.municipality.code,
              option: element.manager.alias + ' - ' + element.municipality.name,
            });
          });
        });
    }
  }
  changePage(event?: number) {
    if (event) {
      this.page = event;
    } else {
      this.page = 1;
    }
    let codes = this.managerCodeAndMunicipality.split(' - ');
    this.qualityService
      .findDeliveries(
        this.status,
        this.page,
        this.pageSize,
        codes.length == 2 ? codes[1] : undefined,
        codes.length === 2 ? codes[0] : undefined
      )
      .subscribe((response) => {
        this.findDeliveries = response;
        this.page = this.findDeliveries.currentPage;
        this.totalElements = this.findDeliveries.totalElements;
        this.pageSize = this.findDeliveries.size;
        this.itemsDelivery = this.findDeliveries.items;
      });
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  viewDetailDelivery(item: itemDelivery) {
    this.router.navigate(['/calidad/entrega/' + item.id]);
  }
  openModalDeleteDelivery(item: itemDelivery) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title = 'Borrar entrega';
    this.optionModalRef.componentInstance.description =
      'Va eliminar la entrega.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.qualityService.removeDelivery(item.id).subscribe((_) => {
            this.toastr.success('Ha eliminado la entrega');
            this.itemsDelivery = this.itemsDelivery.filter(
              (element) => element.id !== item.id
            );
          });
        }
      }
    });
  }
  nameStateDelivery(deliveryStatusId: number): string {
    return FuntionsGlobalsHelper.nameStateDelivery(deliveryStatusId);
  }
  openModalUpdateDelivery(modal: TemplateRef<any>) {
    this.optionModalRef = this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }
  closeModalDeleteDelivery(itemDelivery: itemDelivery) {
    let data = {
      observations: itemDelivery.observations,
    };
    this.qualityService.updateDelivery(itemDelivery.id, data).subscribe((_) => {
      this.modalService.dismissAll();
      this.toastr.success('Actualización realizada');
    });
  }
}
