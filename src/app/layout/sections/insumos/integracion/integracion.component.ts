import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToBottom } from 'src/app/router.animations';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { ModalService } from 'src/app/services/modal/modal.service';

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
  selectsupplyCadastre: number;
  selectsupplyRegistration: number;
  selectsupplyANT: number;
  msgAlert: string;
  mensajeIntegrationResponse: any;
  activateButtonIntegration: boolean;
  idWorkspace: number;
  integrationByWorkspace: any;
  lastIntegration: any;
  selectIntegration: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.departments = [];
    this.munucipalities = [];
    this.selectDepartment = '0';
    this.selectMunicipality = 0;
    this.splitZones = false;
    this.dataWorkSpaceMunicipality = [{
      id: 0,
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
    this.selectsupplyCadastre = 0;
    this.selectsupplyRegistration = 0;
    this.selectsupplyANT = 0;
    this.mensajeIntegrationResponse = {
      message: ''
    };
    this.msgAlert = '<strong>Recomendación: </strong>Por favor revisar los archivos antes de solicitar la integración.';
    this.activateButtonIntegration = true;
    this.idWorkspace = 0;
    this.integrationByWorkspace = [];
    this.lastIntegration = [];
    this.selectIntegration = [];
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
        this.idWorkspace = this.dataWorkSpaceMunicipality[0].id;
        console.log(this.idWorkspace);

        this.serviceProviders.getProviders().subscribe(
          data => {
            this.providers = data;
          }
        );
        this.serviceWorkspaces.GetIntegrationsByWorkspace(this.idWorkspace).subscribe(
          resp => {
            this.integrationByWorkspace = resp;
            this.lastIntegration.push(this.integrationByWorkspace[this.integrationByWorkspace.length - 1]);
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
  integrationSupplies() {
    let data = {
      supplyCadastre: this.selectsupplyCadastre,
      supplyRegistration: this.selectsupplyRegistration
    };
    this.serviceWorkspaces.GetIntegrationCadastreRegistration(this.selectMunicipality, data).subscribe(
      response => {
        this.mensajeIntegrationResponse = response;
        this.msgAlert = this.mensajeIntegrationResponse.message +
          '<br><strong>Por favor ingrese mas tarde, para ver los resultados de la integración</strong>';
        this.selectsupplyCadastre = 0;
        this.selectsupplyRegistration = 0;
        this.activateButtonIntegration = true;
        this.toastr.success('¡Se ha iniciado la integración!');
      },
      error => {
        this.msgAlert = error.error.message;
        this.selectsupplyCadastre = 0;
        this.selectsupplyRegistration = 0;
        this.activateButtonIntegration = true;
      }
    );
  }
  comprobar() {
    if (this.selectsupplyCadastre !== 0 && this.selectsupplyRegistration !== 0) {
      this.activateButtonIntegration = false;
    }
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  closeModal(option: number, id: string) {
    this.modalService.close(id);
  }
  openModal(id: number, modal: string) {
    this.selectIntegration = this.integrationByWorkspace.filter(item => {
      return item.id === id;
    });
    this.modalService.open(modal);
  }
}
