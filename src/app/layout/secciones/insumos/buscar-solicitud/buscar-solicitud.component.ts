import { Component, OnInit } from '@angular/core';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { ProvidersService } from 'src/app/services/providers/providers.service';
@Component({
  selector: 'app-buscar-solicitud',
  templateUrl: './buscar-solicitud.component.html',
  styleUrls: ['./buscar-solicitud.component.scss']
})
export class BuscarSolicitudComponent implements OnInit {

  usermanager: boolean;
  departments: any;
  selectDepartment: string;
  munucipalities: any;
  selectMunicipality: number;
  suppliesManagerRequest: any;
  selectSuppliesManagerRequest: any;
  allSupplies: any;
  size: any;
  number: any;
  totalElements: any;
  idSupplieDelete: number;
  searchText: string;
  tab: number;
  providers: any;
  selectProvider: string;
  infoTabProvider: any;
  selectPackage: string;
  infoTabOrder: any;
  numbersuppliesManagerRequest: any;
  buttonTab1: boolean;
  buttonTab2: boolean;
  buttonTab3: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private serviceProvider: ProvidersService
  ) {
    this.usermanager = false;
    this.departments = [];
    this.selectDepartment = '0';
    this.munucipalities = [];
    this.selectMunicipality = 0;
    this.suppliesManagerRequest = [];
    this.allSupplies = [];
    this.size = 10;
    this.number = 0;
    this.totalElements = 0;
    this.idSupplieDelete = 0;
    this.tab = 1;
    this.providers = [];
    this.selectProvider = '0';
    this.infoTabProvider = [];
    this.selectPackage = '0';
    this.infoTabOrder = [];
    this.numbersuppliesManagerRequest = [];
    this.infoTabOrder = 0;
    this.buttonTab1 = true;
    this.buttonTab2 = true;
    this.buttonTab3 = true;
  }

  ngOnInit() {
    this.usermanager = true;
    this.serviceWorkspaces.GetRequestByManager().subscribe(
      response => {
        this.suppliesManagerRequest = response;
      }
    )
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
  }
  tab2() {
    this.tab = 2;
    this.serviceProvider.getProviders().subscribe(response => {
      this.providers = response;
    });
  }
  tab3() {
    this.tab = 3;
    this.serviceWorkspaces.GetRequestByManager().subscribe(
      response => {
        this.numbersuppliesManagerRequest = response;
      }
    )
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  changeDepartament() {
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.selectDepartment).subscribe(
      data => {
        this.munucipalities = data;
      }
    );
  }
  getPage(page: string) {
    this.serviceWorkspaces.searchSuppliesMunicipality(page, this.selectMunicipality).subscribe(
      (response: any) => {
        this.number = response.number + 1;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.allSupplies = response.items;
      }
    );
  }
  getPageProvider(page: string) {
    this.serviceWorkspaces.searchSuppliesProviders(page, this.selectProvider).subscribe(
      (response: any) => {
        this.number = response.number + 1;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.infoTabProvider = response.items;
      }
    );
  }
  getPageOrder(page: string) {
    this.serviceWorkspaces.searchSuppliesOrder(this.selectPackage).subscribe((response: any) => {
      this.infoTabOrder = response[0].requests;
      this.totalElements = this.infoTabOrder.length;
    });
  }
  activebuttontab1() {
    if (this.selectMunicipality == 0) {
      this.buttonTab1 = true;
    } else {
      this.buttonTab1 = false;
    }
  }
  activebuttontab2() {
    if (this.selectProvider == '0') {
      this.buttonTab2 = true;
    } else {
      this.buttonTab2 = false;
    }
  }
  activebuttontab3() {
    if (this.selectPackage == '0') {
      this.buttonTab3 = true;
    } else {
      this.buttonTab3 = false;
    }
  }
}
