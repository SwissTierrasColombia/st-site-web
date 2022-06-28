import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { DepartamentsInterface } from 'src/app/shared/models/departaments.interface';
import { MunicipalityInterface } from 'src/app/shared/models/municipality.interface';
import { StateDeliveriesEnum } from '../models/state-delivery.enum';
import { SinicService } from '../sinic.service';
import IOptionsFindDeliveryInterface from '../models/options-find-delivery.interface';
import Commons from '../commons/commons';
@Component({
  selector: 'app-find-deliveries',
  templateUrl: './find-deliveries.component.html',
  styleUrls: ['./find-deliveries.component.scss']
})
export class FindDeliveriesComponent implements OnInit {
  @Input() tab: number;
  @Input() isAdministrator: boolean = false;
  @Input() isManager: boolean = false;
  findDeliveries: any;
  itemsDelivery: any[] = [];
  dataWorkspacesByOperator: any[] = [];
  page: number = 1;
  totalElements: number = 0;
  pageSize: number = 10;
  optionModalRef: NgbModalRef;
  selectStates: string = '0';
  stateDeliveriesEnum = StateDeliveriesEnum;
  selectDepartment: string = '0';
  departments: DepartamentsInterface[] = [];
  munucipalities: MunicipalityInterface[] = [];
  selectMunicipality: string = '0';
  managers: any[] = [];
  selectManagerId: string = '0';
  code: string = '';
  statesList: any[] = [];
  statesTab1: string = this.stateDeliveriesEnum.DRAFT;
  statesTab2: string = `${this.stateDeliveriesEnum.FAILED_IMPORT},${this.stateDeliveriesEnum.IMPORTING},${this.stateDeliveriesEnum.IN_QUEUE_TO_IMPORT},${this.stateDeliveriesEnum.SENT_CADASTRAL_AUTHORITY},${this.stateDeliveriesEnum.SUCCESS_IMPORT}`;
  selectDepartmentBol: boolean = false;
  isTab5: boolean = false;
  constructor(
    private workspacesService: WorkspacesService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private sinicService: SinicService,
    private serviceManagers: ManagersService,
    private activedRoute: ActivatedRoute,

  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isAdministrator) {
      this.isAdministrator = changes.isAdministrator.currentValue;
    }
    if (changes.isManager) {
      this.isManager = changes.isManager.currentValue;
    }
    if (changes.tab.currentValue == 1) {
      this.changePage();
      this.statesTab1 = this.stateDeliveriesEnum.DRAFT;
    }
    if (changes.tab.currentValue == 2 || changes.tab.currentValue == 3 || changes.tab.currentValue == 4 || changes.tab.currentValue == 5) {
      this.statesTab2 = `${this.stateDeliveriesEnum.FAILED_IMPORT},${this.stateDeliveriesEnum.IMPORTING},${this.stateDeliveriesEnum.IN_QUEUE_TO_IMPORT},${this.stateDeliveriesEnum.SENT_CADASTRAL_AUTHORITY},${this.stateDeliveriesEnum.SUCCESS_IMPORT}`
      this.changePage();
      this.tab = changes.tab.currentValue;
    }
    if (changes.tab.currentValue == 5) {
      this.isTab5 = true;
    }
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      if (params.tab == '0') {
        if (this.isAdministrator) {
          this.tab = 3
        }
        if (this.isManager) {
          this.tab = 1
        }
      }
      if (params.selectDepartment && params.selectDepartment != '0') {
        this.getDepartaments();
        this.selectDepartment = params.selectDepartment;
        this.changeDepartament();
        if (params.selectMunicipality && params.selectMunicipality != '0') {
          this.selectMunicipality = params.selectMunicipality;
        }
      }
      if (params.selectManagerId && params.selectManagerId != '0') {
        this.getManagers();
        this.selectManagerId = params.selectManagerId;
      }
      if (params.selectStates && params.selectStates != '0') {
        this.selectStates = params.selectStates;
      }
      if (params.code && params.code != '') {
        this.code = params.code;
      }
    });
    this.statesList = [
      {
        id: this.stateDeliveriesEnum.SENT_CADASTRAL_AUTHORITY,
        alias: 'Enviado a Autoridad Catastral'
      },
      {
        id: this.stateDeliveriesEnum.IN_QUEUE_TO_IMPORT,
        alias: 'Esperando para importación a BD'
      },
      {
        id: this.stateDeliveriesEnum.IMPORTING,
        alias: 'Importando a BD'
      },
      {
        id: this.stateDeliveriesEnum.SUCCESS_IMPORT,
        alias: 'Importación exitosa a BD'
      },
      {
        id: this.stateDeliveriesEnum.FAILED_IMPORT,
        alias: 'Fallo en la importación a BD'
      }
    ]

    if (this.isAdministrator) {
      this.getManagers();
    }
    this.getDepartaments();
  }
  getManagers() {
    this.serviceManagers.getManagers().subscribe((data: any) => {
      this.managers = data;
    });
  }
  getDepartaments() {
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
  }
  changeDepartament() {
    this.selectDepartmentBol = true;

    if (this.selectDepartment == '0') {
      this.selectDepartmentBol = false;
      this.changePage();
      this.selectMunicipality = '0';
      this.selectManagerId = '0';
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
    let state = '';
    if (this.selectStates === '0') {
      if (this.tab == 1) {
        state = this.statesTab1
      }
      if (this.tab == 2 || this.tab == 3 || this.tab == 4 || this.tab == 5) {
        state = this.statesTab2
      }
    } else {
      state = this.selectStates
    }
    if (this.selectDepartment === '0') {
      this.selectMunicipality = '0';
      this.selectDepartmentBol = false;
    }
    let options: IOptionsFindDeliveryInterface = {
      page: this.page,
      pageSize: this.pageSize,
      selectStates: state,
      code: this.code,
      selectMunicipality: this.selectMunicipality,
      selectManagerId: this.selectManagerId,
    }
    this.sinicService
      .findDeliveries(options)
      .subscribe((response) => {
        this.findDeliveries = response;
        this.page = this.findDeliveries.currentPage;
        this.totalElements = this.findDeliveries.totalElements;
        this.pageSize = this.findDeliveries.size;
        this.itemsDelivery = this.findDeliveries.items;
        this.selectDepartmentBol = false;
        if (this.code != '') {
          this.isTab5 = false;
        }
      });
  }
  changePage(event?: number) {
    if (event) {
      this.page = event;
    } else {
      this.page = 1;
    }
    let state = ''
    if (this.tab == 1) {
      state = this.statesTab1
    }
    if (this.tab == 2 || this.tab == 3 || this.tab == 4 || this.tab == 5) {
      state = this.statesTab2
    }
    if (this.selectDepartment === '0') {
      this.selectMunicipality = '0'
    }
    let options: IOptionsFindDeliveryInterface = {
      page: this.page,
      pageSize: this.pageSize,
      selectStates: state,
      code: this.code,
      selectMunicipality: this.selectMunicipality,
      selectManagerId: this.selectManagerId,
    }
    this.sinicService
      .findDeliveries(
        options
      )
      .subscribe((response) => {
        this.findDeliveries = response;
        this.page = this.findDeliveries.currentPage;
        this.totalElements = this.findDeliveries.totalElements;
        this.pageSize = this.findDeliveries.size;
        this.itemsDelivery = this.findDeliveries.items;
        if (this.tab != 5) {
          this.isTab5 = false;
        }
      });
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  viewDetailDelivery(item: any) {
    if (item.type === 'FLAT') {
      this.toastr.warning("Esta opción está deshabilitada según lo definido en la resolución 315 de 2022");
      // this.router.navigate([
      //   `sinic/listar-entregas/${this.tab}/entrega-archivo-plano/${item.id}`,
      //   {
      //     isAdministrator: this.isAdministrator,
      //     isManager: this.isManager,
      //     selectDepartment: this.selectDepartment,
      //     selectMunicipality: this.selectMunicipality,
      //     selectManagerId: this.selectManagerId,
      //     selectStates: this.selectStates,
      //     code: this.code,
      //   },
      // ]);
    } else {
      this.router.navigate([
        `sinic/listar-entregas/${this.tab}/entrega/${item.id}`,
        {
          isAdministrator: this.isAdministrator,
          isManager: this.isManager,
          selectDepartment: this.selectDepartment,
          selectMunicipality: this.selectMunicipality,
          selectManagerId: this.selectManagerId,
          selectStates: this.selectStates,
          code: this.code,
        },
      ]);
    }
  }
  openModalDeleteDelivery(item: any) {
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de eliminar el borrador de la entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a eliminar este borrador, si tiene archivos cargados estos se eliminarán.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.sinicService.removeDelivery(item.id).subscribe((_) => {
            this.toastr.success('Ha eliminado la entrega');
            this.itemsDelivery = this.itemsDelivery.filter(
              (element) => element.id !== item.id
            );
          });
        }
      }
    });
  }
  openModalUpdateDelivery(modal: TemplateRef<any>) {
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }
  closeModalUpdateDelivery(item: any) {
    let data = {
      observations: item.observations,
    };
    this.sinicService
      .updateDelivery(item.id, data)
      .subscribe((_) => {
        this.modalService.dismissAll();
        this.toastr.success('Actualización realizada');
      });
  }
  nameStateDelivery(deliveryStatusId: string): string {
    return Commons.nameStateDelivery(deliveryStatusId);
  }
}
