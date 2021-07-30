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
  ) {}

  ngOnInit() {
    this.serviceWorkspaces.getDepartments().subscribe((response) => {
      this.listDepartments = response;
    });
    this.providersService
      .getPendingRequestsPaginate(this.page, this.limit)
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.page = data.currentPage;
        this.totalElements = data.totalElements;
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
        this.selectMunicipality = 0;
        this.selectOrder = '';
      });
  }
  filter() {
    this.providersService
      .getPendingRequestsPaginate(
        this.page,
        this.limit,
        this.selectMunicipality != 0 ? this.selectMunicipality : null,
        this.selectOrder != '' ? this.selectOrder : null
      )
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.totalElements = data.totalElements;
        this.selectMunicipality = 0;
        this.selectOrder = '';
        this.page = data.currentPage;
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
