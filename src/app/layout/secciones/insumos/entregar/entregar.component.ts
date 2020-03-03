import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'src/app/router.animations';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-entregar',
  templateUrl: './entregar.component.html',
  styleUrls: ['./entregar.component.scss'],
  animations: [slideToLeft()]

})
export class EntregarComponent implements OnInit {

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
  deliverySupplies: any;
  sendSuppliesFilter: boolean;
  idWorkSpace: number;
  constructor(
    private roles: RoleModel,
    private serviceWorkspaces: WorkspacesService,
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
    this.deliverySupplies = {
      observations: "",
      supplies: []
    }
    this.sendSuppliesFilter = true;
    this.idWorkSpace = 0;
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
  changeMunucipality() {
    this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
      (response: any) => {
        this.idWorkSpace = response.id;
        this.sendSuppliesFilter = false;
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
  builddelivery(item: any, state: boolean, observations?: string) {
    if (this.usermanager) {
      if (item.observationsTosupplie) {
        if (state && item.observationsTosupplie.length > 0) {
          let data = this.deliverySupplies.supplies.filter((element: any) => {
            return element.supplyId === item.id;
          });
          if (data.length > 0) {
            const data = this.deliverySupplies.supplies.filter((element: any) => {
              return item.id != element.supplyId;
            });
            this.deliverySupplies.supplies = data;
            this.deliverySupplies.supplies.push({
              supplyId: item.id,
              observations: item.observationsTosupplie
            });
          } else {
            this.deliverySupplies.supplies.push({
              supplyId: item.id,
              observations: item.observationsTosupplie
            });
          }
        }
        else {
          const data = this.deliverySupplies.supplies.filter((element: any) => {
            return item.id != element.supplyId;
          });
          this.deliverySupplies.supplies = data;
        }
      } else {
        const data = this.deliverySupplies.supplies.find((element: any) => {
          return item.id == element.supplyId;
        });
        item.observationsTosupplie = data ? data.observations : '';
        this.toastr.info("La observación es obligatoria");
      }
    } else {
      this.toastr.info("No tienes los permisos necesarios para entregar el insumo.");
    }
  }
  sendSupplies() {
    if (this.deliverySupplies.supplies.length > 0) {
      if (this.deliverySupplies.observations.length > 0) {
        const data = this.deliverySupplies.supplies.find(element => {
          return element.observations === '';
        });
        if (data) {
          this.toastr.info("Te faltan algunas observaciones");
        } else {
          this.serviceWorkspaces.deliveriesSupplies(this.idWorkSpace, this.deliverySupplies).subscribe(
            _ => {
              this.toastr.success("Se ha realizado la entrega de los insumos al operador")
            }
          );
        }
      } else {
        this.toastr.info("Las observaciones generales son obligatorias")
      }
    } else {
      this.toastr.info("No has seleccionado ningún insumo, o te faltan las observaciones")
    }
  }
}
