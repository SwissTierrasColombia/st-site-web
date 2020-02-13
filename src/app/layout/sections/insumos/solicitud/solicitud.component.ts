import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { slideToLeft } from 'src/app/router.animations';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';

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
  municipalities: any;
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
  selectModelSupplies: string;
  listModels: any;
  enviarsolicitud: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService,
    private toastr: ToastrService,
  ) {
    this.count = 0;
    this.observations = '';
    this.departments = [];
    this.municipalities = [];
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
    this.selectModelSupplies = '0';
    this.listModels = [];
    this.enviarsolicitud = true;
  }
  ngOnInit() {
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });

    this.serviceWorkspaces.GetTypesModels().subscribe(
        response => {
          this.listModels = response;
        }
      );
  }
  changeDepartament() {
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.selectDepartment.toString()).subscribe(
      data => {
        this.municipalities = data;
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
  }
  changeProvider() {
    this.serviceProviders.getTypeSuppliesByProvider(this.selectProvider.id.toString()).subscribe(
      response => {
        this.dataSuppliesProvider = response;
      }
    );
  }
  agregar() {
    const exist = this.tablesupplies.find(item => {
      return item.idInsumo === this.selectSupplies.id;
    });
    if (exist === undefined) {
      if (this.selectSupplies.modelRequired) {
        this.listsupplies.supplies.push({
          idCount: this.count,
          idInsumo: this.selectSupplies.id,
          observation: this.observations,
          providerId: this.selectProvider.id,
          typeSupplyId: this.selectSupplies.id,
          modelVersion: this.selectModelSupplies
        });
        this.tablesupplies.push({
          idCount: this.count,
          idEntidad: this.selectProvider.id,
          entidad: this.selectProvider.name,
          idInsumo: this.selectSupplies.id,
          insumo: this.selectSupplies.name,
          observacion: this.observations,
          modelRequired: true,
          modelVersion: this.selectModelSupplies,
          versions: this.listModels
        });
        this.count += 1;
        this.selectSupplies = 0;
        this.observations = '';
      } else {
      this.listsupplies.supplies.push({
        idCount: this.count,
        idInsumo: this.selectSupplies.id,
        observation: this.observations,
        providerId: this.selectProvider.id,
        typeSupplyId: this.selectSupplies.id,
      });
      this.tablesupplies.push({
        idCount: this.count,
        idEntidad: this.selectProvider.id,
        entidad: this.selectProvider.name,
        idInsumo: this.selectSupplies.id,
        insumo: this.selectSupplies.name,
        observacion: this.observations
      });
      this.count += 1;
      this.selectSupplies = 0;
      this.observations = '';
    }
    } else {
      this.toastr.show('Ya ha solicitado el insumo.', this.selectSupplies.name);
    }
    this.comprobarEnviarSolicitud();
  }
  delete(item: any) {
    this.tablesupplies = this.tablesupplies.filter((element: any) => {
      if (element.idInsumo !== item.idInsumo) {
        return element;
      }
    });
    this.listsupplies.supplies = this.listsupplies.supplies.filter((element: any) => {
      if (element.idInsumo !== item.idInsumo) {
        return element;
      }
    });
    this.comprobarEnviarSolicitud();
  }
  comprobarEnviarSolicitud() {
    const send = this.listsupplies.supplies.find(
      item => {
        return item.modelVersion === '0';
      }
    );
    if (send) {
      this.enviarsolicitud = true;
    } else {
      this.enviarsolicitud = false;
    }
  }
  submitInfo() {
    this.serviceWorkspaces.createRequest(this.selectMunicipality, this.listsupplies).subscribe(
      _ => {
        this.toastr.success('Solicitud enviada correctamente');
      }
    );
  }
  changeModelSupplies(id, itemModelVersion) {
    this.listsupplies.supplies.find((item: any) => {
      if (item.idCount === id) {
        item.modelVersion = itemModelVersion;
      }
    });
  this.toastr.info('Ha seleccionado la versión del modelo de insumos: ' + itemModelVersion);
  this.comprobarEnviarSolicitud();
  }

}
