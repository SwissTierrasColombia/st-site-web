import { makeDeliveryToManagerInterface } from './../models/make-delivery-to-manager.interface';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { Component, OnInit } from '@angular/core';
import { getWorkspacesByOperatorInterface } from '../models/get-workspaces-by-operator.interface';
import { selectInterface } from 'src/app/shared/models/select.interface';

@Component({
  selector: 'app-make-delivery-manager',
  templateUrl: './make-delivery-manager.component.html',
  styleUrls: ['./make-delivery-manager.component.scss'],
})
export class MakeDeliveryManagerComponent implements OnInit {
  dataWorkspacesByOperator: getWorkspacesByOperatorInterface[] = [];
  listManagerWithMunicipality: selectInterface[] = [];
  managerCodeAndMunicipality: string = '0';
  dataMakeDeliveryToManager: makeDeliveryToManagerInterface;
  constructor(private workspacesService: WorkspacesService) {
    this.dataMakeDeliveryToManager = {
      deliveredProducts: [],
      managerCode: '0',
      municipalityCode: '0',
      observations: '',
    };
  }

  ngOnInit(): void {
    this.workspacesService
      .getWorkspacesByOperator()
      .subscribe((response: getWorkspacesByOperatorInterface[]) => {
        this.dataWorkspacesByOperator = response;
        console.log(this.dataWorkspacesByOperator);
        this.dataWorkspacesByOperator.forEach((element) => {
          this.listManagerWithMunicipality.push({
            id: element.managerCode + ' - ' + element.municipality.code,
            option: element.manager.alias + ' - ' + element.municipality.name,
          });
        });
      });
  }
}
