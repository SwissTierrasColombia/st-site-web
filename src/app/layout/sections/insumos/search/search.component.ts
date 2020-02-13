import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'src/app/router.animations';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

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
    this.selectSuppliesManagerRequest = 0;
    this.allSupplies = [];
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
  changeDepartament() {
    this.serviceWorkspaces.GetMunicipalitiesByDeparment(this.selectDepartment).subscribe(
      data => {
        this.munucipalities = data;
      }
    );
  }
  searchSupplies(){
    const data = {
      selectMunicipality: this.selectMunicipality
    }
    this.serviceWorkspaces.GetSuppliesByMunicipalityFilter(data).subscribe(
      response => {
        this.allSupplies = response;
        console.log(this.allSupplies);
        
      }
    )
  }

}
