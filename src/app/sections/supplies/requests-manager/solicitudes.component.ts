import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { Item } from './models/get-pending-requets.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

const moment = _moment;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit {
  dataRequestPending: Item[] = [];
  page: number = 1;
  limit: number = 10;
  totalElements: number;
  listDepartments: any = [];
  listMunicipalities: any = [];
  selectDepartment: number = 0;
  selectMunicipality: string = '0';
  selectOrder: string = '';
  constructor(
    private router: Router,
    private providersService: ProvidersService,
    private serviceWorkspaces: WorkspacesService
  ) {}

  async ngOnInit() {
    if (
      localStorage.getItem('selectDepartment') !== '0' &&
      localStorage.getItem('selectDepartment') !== 'NaN' &&
      localStorage.getItem('selectDepartment') != null &&
      localStorage.getItem('selectDepartment') != undefined
    ) {
      this.selectDepartment = parseInt(
        localStorage.getItem('selectDepartment')
      );
      await this.changeDepartament();
      if (
        localStorage.getItem('selectMunicipality') !== '0' &&
        localStorage.getItem('selectMunicipality') !== 'NaN' &&
        localStorage.getItem('selectMunicipality') != null &&
        localStorage.getItem('selectMunicipality') != undefined
      ) {
        this.selectMunicipality = localStorage.getItem('selectMunicipality');
      }
    }
    if (
      localStorage.getItem('selectOrder') !== '' &&
      localStorage.getItem('selectOrder') !== 'null' &&
      localStorage.getItem('selectOrder') != null &&
      localStorage.getItem('selectOrder') != undefined
    ) {
      this.selectOrder = localStorage.getItem('selectOrder');
    }
    if (this.selectMunicipality !== '0' || this.selectOrder !== '') {
      this.filter();
    } else {
      this.providersService
        .getPendingRequestsPaginate(this.page, this.limit)
        .subscribe((data) => {
          this.dataRequestPending = data.items;
          this.page = data.currentPage;
          this.totalElements = data.totalElements;
        });
    }
    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.listDepartments = response;
    });
  }
  getPage(page: number) {
    this.dataRequestPending = [];
    this.page = page;
    this.providersService
      .getPendingRequestsPaginate(page, this.limit)
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.page = data.currentPage;
        this.totalElements = data.totalElements;
        this.selectMunicipality = '0';
        this.selectOrder = '';
      });
  }
  filter() {
    localStorage.setItem('selectDepartment', this.selectDepartment.toString());
    localStorage.setItem('selectMunicipality', this.selectMunicipality);
    localStorage.setItem('selectOrder', this.selectOrder);
    this.providersService
      .getPendingRequestsPaginate(
        this.page,
        this.limit,
        this.selectMunicipality != '0' ? this.selectMunicipality : null,
        this.selectOrder != '' ? this.selectOrder : null
      )
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.totalElements = data.totalElements;
        this.page = data.currentPage;
      });
  }
  async changeDepartament() {
    await this.serviceWorkspaces
      .GetMunicipalitiesByDeparment(this.selectDepartment)
      .subscribe((data) => {
        this.listMunicipalities = data;
        this.listMunicipalities.sort(function (a, b) {
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
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  load(idInsumo: number) {
    this.router.navigate([
      '/insumos/solicitudes/pendientes/cargar/' + idInsumo,
    ]);
  }
  getEntity(item: any) {
    const data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
}
