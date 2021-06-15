import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';
import { CadastralAuthorityService } from 'src/app/services/v2/cadastral-authority/cadastral-authority.service';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workspace-refuse',
  templateUrl: './workspace-refuse.component.html',
  styleUrls: ['./workspace-refuse.component.scss'],
})
export class WorkspaceRefuseComponent implements OnInit {
  activeManagers: any;
  selectManager: number;
  munucipalities: any;
  selectMunicipality: number;
  isAdministrator: boolean;
  isActive: boolean;
  isActiveSearch: boolean;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private cadastralAuthorityService: CadastralAuthorityService,
    private roles: RoleModel,
    public toastrService: ToastrService,
    private serviceManagers: ManagersService,
    private modalService: NgbModal
  ) {
    this.activeManagers = [];
    this.selectManager = 0;
    this.munucipalities = 0;
    this.isAdministrator = false;
    this.selectMunicipality = 0;
    this.isActiveSearch = false;
  }

  ngOnInit(): void {
    this.serviceManagers.getManagers().subscribe((data: any) => {
      this.activeManagers = data;
    });
    const rol = JwtHelper.getUserPublicInformation();
    const role = rol.roles.find((elem) => {
      return elem.id === this.roles.administrador;
    });
    this.isAdministrator = false;
    if (role) {
      this.isAdministrator = true;
    }
  }

  changeDepartament() {
    this.serviceWorkspaces
      .getMunicipalitiesByManager(this.selectManager)
      .subscribe((data) => {
        this.munucipalities = data;
      });
  }
  refuseWorkSpaceActive() {
    this.cadastralAuthorityService
      .unassignManagerFromMunicipality(
        this.selectMunicipality,
        this.selectManager
      )
      .subscribe((_) => {
        this.selectManager = 0;
        this.isAdministrator = false;
        this.selectMunicipality = 0;
        this.isActiveSearch = false;
        this.toastrService.success('Ha desasignado el municipio.');
      });
  }
  changeMunicipalitie() {
    this.isActiveSearch = false;
    if (this.selectMunicipality !== 0) {
      this.isActiveSearch = true;
    }
  }
  openModalRefuse(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalRefuse(option: boolean) {
    this.modalService.dismissAll();
    if (option) {
      this.refuseWorkSpaceActive();
    }
  }
}
