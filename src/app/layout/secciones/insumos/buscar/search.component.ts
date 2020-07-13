import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
  constructor(
    private roles: RoleModel,
    private serviceWorkspaces: WorkspacesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.usermanager = false;
    this.departments = [];
    this.selectDepartment = '0';
    this.munucipalities = [];
    this.selectMunicipality = 0;
    this.suppliesManagerRequest = [];
    this.allSupplies = [];
    this.size = 20;
    this.number = 0;
    this.totalElements = 0;
    this.idSupplieDelete = 0;
  }

  ngOnInit() {
    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find(elem => {
      return elem.id === this.roles.gestor;
    });
    if (role) {
      this.usermanager = true;
      this.serviceWorkspaces.GetRequestByManager().subscribe(
        response => {
          this.suppliesManagerRequest = response;
        }
      )
    }
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departments = response;
      });
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
    this.serviceWorkspaces.GetSuppliesByMunicipalityFilter(this.selectMunicipality, page).subscribe(
      (response: any) => {
        this.number = response.number + 1;
        this.size = response.size;
        this.totalElements = response.totalElements;
        this.allSupplies = response.items;
        for (let index = 0; index < this.allSupplies.length; index++) {
          if (this.allSupplies[index].typeSupply === null) {
            this.allSupplies[index].typeSupply = {
              "provider": {
                "name": "N/A"
              },
              "name": "N/A"
            }
          }
        }
        this.allSupplies.sort(function (a: any, b: any) {
          if (a.typeSupply.provider.name > b.typeSupply.provider.name) {
            return 1;
          }
          if (a.typeSupply.provider.name < b.typeSupply.provider.name) {
            return -1;
          }
          //a must be equal to b
          return 0;
        });
      }
    );

  }
  downloadSupplies(idSupplie: number, nameSupplie: string) {
    this.serviceWorkspaces.downloadSupplie(idSupplie).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        //const ext = data.headers.get('Content-Disposition');
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, nameSupplie + '.zip');
      }
    );
  }
  deleteSupplies(idSupplie: number) {
    this.serviceWorkspaces.deleteSupplies(this.selectMunicipality, idSupplie).subscribe(
      data => {
        this.toastr.success("Se ha eliminado el insumo");
      }
    );
  }
  closeModal(option: boolean) {
    this.modalService.dismissAll();
    if (option) {
      this.deleteSupplies(this.idSupplieDelete);
    }
  }
  openModal(idSupplieDelete: number, modal: any) {
    this.idSupplieDelete = idSupplieDelete;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
}
