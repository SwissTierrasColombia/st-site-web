import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToBottom } from 'src/app/router.animations';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-integracion',
  templateUrl: './integracion.component.html',
  styleUrls: ['./integracion.component.scss'],
  animations: [slideToBottom()]
})
export class IntegracionComponent implements OnInit {

  departments: any;
  munucipalities: any;
  selectDepartment: string;
  selectMunicipality: number;
  dataWorkSpaceMunicipality: any;
  splitZones: boolean;
  providers: any;
  dataSuppliesProvider: any;
  selectSupplies: number;
  listsupplies: { deadline: string; supplies: any; };
  catrastro: any;
  registro: any;
  ant: any;
  municipalityXTF: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService,
  ) {
    this.departments = [];
    this.munucipalities = [];
    this.selectDepartment = '0';
    this.selectMunicipality = 0;
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
    this.catrastro = [];
    this.registro = [];
    this.ant = [];
    this.municipalityXTF = [];
  }

  ngOnInit() {
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }
  changeDepartament() {
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.selectDepartment).subscribe(
      data => {
        this.munucipalities = data;
      }
    );
  }
  changeMunucipality() {
    this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
      response => {
        this.dataWorkSpaceMunicipality = response;

        this.serviceProviders.getProviders().subscribe(
          data => {
            this.providers = data;

          }
        );
      }
    );
    this.serviceWorkspaces.GetSuppliesByMunicipalityXTF(this.selectMunicipality).subscribe(
      response => {
        this.municipalityXTF = response;
        this.catrastro = this.municipalityXTF.filter(item => {
          if (item.typeSupply.providerProfile.name === 'CATASTRAL') {
            return item;
          }
        });
        this.registro = this.municipalityXTF.filter(item => {
          if (item.typeSupply.providerProfile.name === 'REGISTRO') {
            return item;
          }
        });
        this.ant = this.municipalityXTF.filter(item => {
          if (item.typeSupply.providerProfile.name === 'ANT') {
            return item;
          }
        });
      }
    );
  }

}
