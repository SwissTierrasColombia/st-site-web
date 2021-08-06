import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

const moment = _moment;

@Component({
  selector: 'app-solicitudes-atendidas',
  templateUrl: './solicitudes-atendidas.component.html',
  styleUrls: ['./solicitudes-atendidas.component.scss'],
})
export class SolicitudesAtendidasComponent implements OnInit {
  dataRequestPending: any;
  page: number = 1;
  limit: number = 10;
  totalElements: number;
  listDepartments: any = [];
  listMunicipalities: any = [];
  selectDepartment: number = 0;
  selectMunicipality: string = '0';
  selectOrder: string = '';

  constructor(
    private providersService: ProvidersService,
    private router: Router,
    private serviceWorkspaces: WorkspacesService
  ) {
    this.dataRequestPending = [];
  }

  async ngOnInit() {
    if (
      localStorage.getItem('selectDepartmentAtendidas') !== '0' &&
      localStorage.getItem('selectDepartmentAtendidas') !== 'NaN' &&
      localStorage.getItem('selectDepartmentAtendidas') != null &&
      localStorage.getItem('selectDepartmentAtendidas') != undefined
    ) {
      this.selectDepartment = parseInt(
        localStorage.getItem('selectDepartmentAtendidas')
      );
      await this.changeDepartament();
      if (
        localStorage.getItem('selectMunicipalityAtendidas') !== '0' &&
        localStorage.getItem('selectMunicipalityAtendidas') !== 'NaN' &&
        localStorage.getItem('selectMunicipalityAtendidas') != null &&
        localStorage.getItem('selectMunicipalityAtendidas') != undefined
      ) {
        this.selectMunicipality = localStorage.getItem(
          'selectMunicipalityAtendidas'
        );
      }
    }
    if (
      localStorage.getItem('selectOrderAtendidas') !== '' &&
      localStorage.getItem('selectOrderAtendidas') !== 'null' &&
      localStorage.getItem('selectOrderAtendidas') != null &&
      localStorage.getItem('selectOrderAtendidas') != undefined
    ) {
      this.selectOrder = localStorage.getItem('selectOrderAtendidas');
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
  filter() {
    localStorage.setItem(
      'selectDepartmentAtendidas',
      this.selectDepartment.toString()
    );
    localStorage.setItem(
      'selectMunicipalityAtendidas',
      this.selectMunicipality
    );
    localStorage.setItem('selectOrderAtendidas', this.selectOrder);
    this.providersService
      .getAttentedRequetsPagination(
        this.page,
        this.limit,
        this.selectMunicipality != '0' ? this.selectMunicipality : null,
        this.selectOrder != '' ? this.selectOrder : null
      )
      .subscribe((data) => {
        this.dataRequestPending = data.items;
        this.totalElements = data.totalElements;
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
  getPage(page: number) {
    this.page = page;
    this.providersService
      .getAttentedRequetsPagination(page, this.limit)
      .subscribe((data) => {
        this.dataRequestPending = data.items;
      });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  load(idInsumo: number) {
    this.router.navigate(['/insumos/solicitudes/atendidas/ver/' + idInsumo]);
  }
  getEntity(item: any) {
    let data = item.emitters.find((elem: any) => {
      return elem.emitterType === 'ENTITY';
    });
    return data.user.name;
  }
}
