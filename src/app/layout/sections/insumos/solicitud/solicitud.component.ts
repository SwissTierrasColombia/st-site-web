import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/services/gestion-municipio/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToLeft } from 'src/app/router.animations';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  animations: [slideToLeft()]
})
export class SolicitudComponent implements OnInit {

  docsSoport: File;
  departments: any;
  selectDepartment: number;
  splitZones: boolean;
  munucipalities: any;
  selectMunicipality: number;
  dataWorkSpaceMunicipality: any;
  providers: any;
  selectProvider: any;
  dataSuppliesProvider: any;
  selectSupplies: any;
  observations: string;
  listsupplies: any;
  tablesupplies: any;
  count: number;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService
  ) {
    this.count = 0;
    this.observations = '';
    this.departments = [];
    this.munucipalities = [];
    this.selectDepartment = 0;
    this.selectMunicipality = 0;
    this.selectProvider = 0;
    this.splitZones = false;
    this.dataWorkSpaceMunicipality = [{
      manager: {
        name: ''
      },
      operators: [{
        operator: {
          name: ''
        }
      }],
      numberAlphanumericParcels: '',
      municipalityArea: ''
    }];
    this.providers = [];
    this.dataSuppliesProvider = [];
    this.selectSupplies = 0;
    this.listsupplies = {
      deadline: '',
      supplies: []
    };
    this.tablesupplies = [];
  }
  ngOnInit() {
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }
  changeDepartament() {
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.selectDepartment.toString()).subscribe(
      data => {
        this.munucipalities = data;
      }
    );
  }
  changeMunucipality() {
    this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
      response => {
        this.dataWorkSpaceMunicipality = response;
        // console.log(this.dataWorkSpaceMunicipality);
        this.serviceProviders.getProviders().subscribe(
          data => {
            this.providers = data;
          }
        );
      }
    );
  }
  changeProvider() {
    this.serviceProviders.getTypeSuppliesByProvider(this.selectProvider.id.toString()).subscribe(
      response => {
        this.dataSuppliesProvider = response;
      }
    );
  }
  agregar() {
    this.listsupplies.supplies.push({
      observation: this.observations,
      providerId: this.selectProvider.id,
      typeSupplyId: this.selectSupplies.id
    });
    this.tablesupplies.push({
      id: this.count,
      idEntidad: this.selectProvider.id,
      entidad: this.selectProvider.name,
      idInsumo: this.selectSupplies.id,
      insumo: this.selectSupplies.name,
      observacion: this.observations
    });
    this.dataSuppliesProvider = this.dataSuppliesProvider.filter(element => {
      if (element.id !== this.selectSupplies.id) {
        return element;
      }
    });
    this.count += 1;
    this.selectSupplies = 0;
    this.observations = '';
  }
  delete(item: any) {
    this.tablesupplies = this.tablesupplies.filter((element: any) => {
      if (element.idInsumo !== item.idInsumo) {
        return element;
      }
    });
    if (item.idInsumo) {
      let data: any;
      this.serviceProviders.getTypeSuppliesByProvider(item.idEntidad).subscribe(
        response => {
          data = response;
          data = data.filter((element: any) => {
            if (element.id === item.idInsumo) {
              return element;
            }
          });
          this.dataSuppliesProvider.push(data[0]);
        }
      );
    }
  }
  submitInfo() {
    this.serviceWorkspaces.createRequest(this.selectMunicipality, this.listsupplies).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
