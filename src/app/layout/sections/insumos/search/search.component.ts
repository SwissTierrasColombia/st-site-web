import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'src/app/router.animations';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [slideToLeft()]
})
export class SearchComponent implements OnInit {

  usermanager: boolean;
  departments: any;
  selectDepartment: string;
  munucipalities: any;
  selectMunicipality: string;
  suppliesManagerRequest: any;
  selectSuppliesManagerRequest: any;
  allSupplies: any;
  size: any;
  number: any;
  totalElements: any;
  constructor(
    private roles: RoleModel,
    private serviceWorkspaces: WorkspacesService
  ) {
    this.usermanager = false;
    this.departments = [];
    this.selectDepartment = '0';
    this.munucipalities = [];
    this.selectMunicipality = '0';
    this.suppliesManagerRequest = [];
    this.allSupplies = [];
    this.size = 20;
    this.number = 0;
    this.totalElements = 0;
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
    if (this.selectSuppliesManagerRequest && this.selectSuppliesManagerRequest.length > 0) {
      let itemsSupplies = this.selectSuppliesManagerRequest.join();
      this.serviceWorkspaces.GetSuppliesByMunicipalityFilter(this.selectMunicipality, page, itemsSupplies).subscribe(
        (response: any) => {
          this.number = response.number + 1;
          this.size = response.size;
          this.totalElements = response.totalElements;
          this.allSupplies = response.items;
        }
      );
    } else {
      this.serviceWorkspaces.GetSuppliesByMunicipalityFilter(this.selectMunicipality, page).subscribe(
        (response: any) => {
          this.number = response.number + 1;
          this.size = response.size;
          this.totalElements = response.totalElements;
          this.allSupplies = response.items;
        }
      );
    }
  }
  downloadSupplies(idSupplie: number, nameSupplie: string) {
    this.serviceWorkspaces.downloadSupplie(idSupplie).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const ext = contentType.split(',')[1];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, nameSupplie + '.zip');
        window.open(url);
      }
    );
  }
}
