import {
  findDeliveriesInterface,
  itemDelivery,
} from './../models/find-deliveries.interface';
import { Component, OnInit } from '@angular/core';
import { statesDeliveriesEnum } from '../models/states-deliveries.enum';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { selectInterface } from 'src/app/shared/models/select.interface';
import { getWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Router } from '@angular/router';
import { QualityService } from './../quality.service';

@Component({
  selector: 'app-view-deliveries',
  templateUrl: './view-deliveries.component.html',
  styleUrls: ['./view-deliveries.component.scss'],
})
export class ViewDeliveriesComponent implements OnInit {
  findDeliveries: findDeliveriesInterface;
  itemsDelivery: itemDelivery[] = [];
  dataWorkspacesByOperator: getWorkspacesByOperatorInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  managerCodeAndMunicipality: string = '0';
  page: number = 1;
  totalElements: number = 0;
  pageSize: number = 10;
  constructor(
    private workspacesService: WorkspacesService,
    private qualityService: QualityService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.changePage();
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
        statesDeliveriesEnum.BORRADOR,
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
    this.router.navigate(['/operador/entrega/' + item.id]);
  }
}
