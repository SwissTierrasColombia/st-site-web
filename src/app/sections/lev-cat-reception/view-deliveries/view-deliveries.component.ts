import { MunicipalityInterface } from '../../../shared/models/municipality.interface';
import {
  FindDeliveriesInterface,
  ItemDelivery,
} from '../models/find-deliveries.interface';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { StatesDeliveriesEnum } from '../models/states-deliveries.enum';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { GetWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import { LevCatReceptionService } from '../lev-cat-reception.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DepartamentsInterface } from 'src/app/shared/models/departaments.interface';
import { OperatorByManager } from 'src/app/shared/models/operator-by-manager.interface';

@Component({
  selector: 'app-view-deliveries',
  templateUrl: './view-deliveries.component.html',
  styleUrls: ['./view-deliveries.component.scss'],
})
export class ViewDeliveriesComponent implements OnInit, OnChanges {
  @Input() tab: number;
  @Input() isOperator: boolean = false;
  @Input() isManager: boolean = false;
  findDeliveries: FindDeliveriesInterface;
  itemsDelivery: ItemDelivery[] = [];
  dataWorkspacesByOperator: GetWorkspacesByOperatorInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  managerCodeAndMunicipality: string = '0';
  page: number = 1;
  totalElements: number = 0;
  pageSize: number = 10;
  optionModalRef: NgbModalRef;
  status: string | number;
  StatesDeliveriesEnum = StatesDeliveriesEnum;
  selectDepartment: number = 0;
  departments: DepartamentsInterface[] = [];
  munucipalities: MunicipalityInterface[] = [];
  selectMunicipality: number = 0;
  operators: OperatorByManager[] = [];
  selectOperatorId: string = '0';
  selectMunicipalityCode: string;
  selectOrder: string = '';
  constructor(
    private workspacesService: WorkspacesService,
    private levCatReceptionService: LevCatReceptionService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOperator) {
      this.isOperator = changes.isOperator.currentValue;
    }
    if (changes.isManager) {
      this.isManager = changes.isManager.currentValue;
    }
    if (changes.tab.currentValue === 1) {
      this.status = StatesDeliveriesEnum.BORRADOR;
      this.changePage();
    }
    if (changes.tab.currentValue === 2) {
      this.status = StatesDeliveriesEnum.ENTREGADO;
      this.changePage();
    }
    if (changes.tab.currentValue === 3) {
      this.status =
        StatesDeliveriesEnum.EN_REVISION +
        ',' +
        StatesDeliveriesEnum.EN_CORRECCION;
      this.changePage();
    }
    if (changes.tab.currentValue === 4) {
      this.status = StatesDeliveriesEnum.EN_CORRECCION;
      this.changePage();
    }
    if (changes.tab.currentValue === 5) {
      this.status =
        StatesDeliveriesEnum.ACEPTADO + ',' + StatesDeliveriesEnum.RECHAZADO;
      this.changePage();
    }
    this.tab = changes.tab.currentValue;
  }

  ngOnInit(): void {
    if (this.isOperator) {
      this.workspacesService
        .getWorkspacesByOperator()
        .subscribe((response: GetWorkspacesByOperatorInterface[]) => {
          this.dataWorkspacesByOperator = response;
          this.dataWorkspacesByOperator.forEach((element) => {
            this.listManagerWithMunicipality.push({
              id: element.managerCode + ' - ' + element.municipality.code,
              option: element.manager.alias + ' - ' + element.municipality.name,
            });
          });
        });
    }
    if (!this.isOperator) {
      this.workspacesService.getDepartments().subscribe((response) => {
        this.departments = response;
        this.departments.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      });
      this.workspacesService.getOperatorsByManager().subscribe((element) => {
        this.operators = element;
      });
    }
  }
  changeDepartament() {
    if (this.selectDepartment == 0) {
      this.changePage();
      this.selectMunicipalityCode = '0';
      this.selectOperatorId = '0';
    }
    this.workspacesService
      .GetMunicipalitiesByDeparment(Number(this.selectDepartment))
      .subscribe((data) => {
        this.munucipalities = data;
        this.munucipalities.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      });
  }
  filterDelivery() {
    this.levCatReceptionService
      .findDeliveries(
        this.status,
        this.page,
        this.pageSize,
        this.selectMunicipalityCode != '0'
          ? this.selectMunicipalityCode
          : undefined,
        undefined,
        this.selectOperatorId != '0' ? this.selectOperatorId : undefined,
        this.selectOrder != '' ? this.selectOrder : undefined
      )
      .subscribe((response) => {
        this.findDeliveries = response;
        this.page = this.findDeliveries.currentPage;
        this.totalElements = this.findDeliveries.totalElements;
        this.pageSize = this.findDeliveries.size;
        this.itemsDelivery = this.findDeliveries.items;
      });
  }
  changePage(event?: number) {
    if (event) {
      this.page = event;
    } else {
      this.page = 1;
    }
    let codes = this.managerCodeAndMunicipality.split(' - ');
    this.levCatReceptionService
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
  viewDetailDelivery(item: ItemDelivery) {
    this.router.navigate([
      '/calidad/' + this.tab + '/entrega/' + item.id,
      {
        isOperator: this.isOperator,
        isManager: this.isManager,
      },
    ]);
  }
  openModalDeleteDelivery(item: ItemDelivery) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de eliminar la entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a eliminar este borrador.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.levCatReceptionService.removeDelivery(item.id).subscribe((_) => {
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
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }
  closeModalUpdateDelivery(itemDelivery: ItemDelivery) {
    let data = {
      observations: itemDelivery.observations,
    };
    this.levCatReceptionService
      .updateDelivery(itemDelivery.id, data)
      .subscribe((_) => {
        this.modalService.dismissAll();
        this.toastr.success('Actualización realizada');
      });
  }
}
