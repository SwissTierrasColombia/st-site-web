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
  numSolicitudes: any;
  searchText: string;
  page: number = 1;
  limit: number = 10;
  totalElements: number;
  listDepartments: any = [];
  listMunicipalities: any = [];
  selectDepartment: number = 0;
  selectMunicipality: number = 0;
  selectOrder: string = '';
  constructor(
    private router: Router,
    private providersService: ProvidersService,
    private serviceWorkspaces: WorkspacesService
  ) {
    this.numSolicitudes = 0;
  }

  ngOnInit() {
    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.listDepartments = response;
    });
    this.providersService
      .getPendingRequestsPaginate(this.page, this.limit)
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.numSolicitudes = data.totalElements;
        this.totalElements = data.totalElements;
      });
  }
  filter() {
    this.providersService
      .getAttentedRequetsPagination(
        this.page,
        this.limit,
        this.selectMunicipality != 0 ? this.selectMunicipality : null,
        this.selectOrder != '' ? this.selectOrder : null
      )
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.numSolicitudes = data.totalElements;
        this.totalElements = data.totalElements;
      });
  }
  changeDepartament() {
    this.serviceWorkspaces
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
  getPage(page: number) {
    this.page = page;
    this.providersService
      .getPendingRequestsPaginate(page, this.limit)
      .subscribe((data) => {
        this.dataRequestPending = data.items;
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
