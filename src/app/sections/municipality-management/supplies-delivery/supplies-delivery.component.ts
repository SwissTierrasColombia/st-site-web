import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { SuppliesService } from 'src/app/services/supplies/supplies.service';
import * as _moment from 'moment';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { JwtHelper } from 'src/app/shared/helpers/jwt';
import { RoleModel } from 'src/app/shared/helpers/role.model';

const moment = _moment;

@Component({
  selector: 'app-supplies-delivery',
  templateUrl: './supplies-delivery.component.html',
  styleUrls: ['./supplies-delivery.component.scss'],
})
export class SuppliesDeliveryComponent implements OnInit {
  selectAttachments: number;
  ftpAttachmentsTypes: string;
  fileAttachmentsTypes: any;
  validInputAttachmentsTypes: boolean;
  observationsAttachmentsTypes: string;
  nameAttachmentsTypes: string;
  passftpAttachments: string;
  selectMunicipality: number;
  suppliesAttachmentsData: any;
  dataAttachmentsTypes: any;
  idSupplieDelete: number;
  idWorkspace: number;
  isSearch: boolean;
  activeManagers: any;
  isAdministrator: boolean;
  selectManager: number;
  munucipalities: any;
  isActive: boolean;
  isActiveSearch: boolean;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private serviceWorkspaces: WorkspacesService,
    private insumosService: SuppliesService,
    private serviceManagers: ManagersService,
    private roles: RoleModel
  ) {
    this.selectAttachments = 0;
    this.ftpAttachmentsTypes = '';
    this.validInputAttachmentsTypes = false;
    this.observationsAttachmentsTypes = '';
    this.nameAttachmentsTypes = '';
    this.passftpAttachments = '';
    this.selectMunicipality = 0;
    this.suppliesAttachmentsData = [];
    this.dataAttachmentsTypes = [];
    this.idWorkspace = 0;
    this.isSearch = false;
    this.activeManagers = [];
    this.selectManager = 0;
    this.munucipalities = 0;
    this.isAdministrator = false;
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
  searchWorkSpaceActive() {
    this.serviceWorkspaces
      .getWorkSpaceByMunicipality(this.selectMunicipality.toString())
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.isActive = true;
          this.idWorkspace = response[0].id;
          this.search();
          this.isSearch = true;
        } else {
          this.isSearch = false;
          this.isActive = false;
          this.idWorkspace = 0;
        }
      });
  }
  changeMunicipalitie() {
    this.isActiveSearch = false;
    if (this.selectMunicipality !== 0) {
      this.isActiveSearch = true;
    }
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('DD/MM/YYYY');
  }
  search() {
    this.insumosService.GetAttachmentsTypes().subscribe((data) => {
      this.dataAttachmentsTypes = data;
    });
    this.serviceWorkspaces
      .getSuppliesAttachments(this.selectMunicipality, this.selectManager)
      .subscribe((response) => {
        this.suppliesAttachmentsData = response;
        this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(
          (element) => {
            const isCadastral = element.owners.find(
              (data) => data.ownerType === 'CADASTRAL_AUTHORITY'
            );
            if (isCadastral) {
              return element;
            }
          }
        );
      });
  }
  docSoportAttachmentsTypes(files: FileList) {
    if (this.selectAttachments === 1 || this.selectAttachments === 3) {
      this.ftpAttachmentsTypes = '';
    }
    this.ftpAttachmentsTypes = '';
    if (files[0].size / 1024 / 1024 <= environment.sizeFile) {
      var re = /zip*/;
      if (files[0].type.match(re)) {
        this.fileAttachmentsTypes = files[0];
      } else {
        if (files[0].size / 1024 / 1024 > environment.sizeFileUnZip) {
          this.fileAttachmentsTypes = undefined;
          this.toastr.error(
            'Por favor convierta el archivo en .zip antes de subirlo, ya que supera el tamaño de cargue permitido.'
          );
        } else {
          this.fileAttachmentsTypes = files[0];
          this.validInputAttachmentsTypes = false;
          if (
            this.selectAttachments !== 0 &&
            this.observationsAttachmentsTypes !== '' &&
            (this.fileAttachmentsTypes !== undefined ||
              this.ftpAttachmentsTypes !== '')
          ) {
            this.validInputAttachmentsTypes = true;
          }
        }
      }
    } else {
      this.toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }
  validAttachmentsTypes() {
    this.validInputAttachmentsTypes = false;
    if (this.selectAttachments === 2) {
      this.fileAttachmentsTypes = undefined;
    }
    if (this.selectAttachments === 1 || this.selectAttachments === 3) {
      this.ftpAttachmentsTypes = '';
    }
    if (
      this.selectAttachments !== 0 &&
      this.observationsAttachmentsTypes !== '' &&
      this.nameAttachmentsTypes !== '' &&
      (this.fileAttachmentsTypes !== undefined ||
        this.ftpAttachmentsTypes !== '')
    ) {
      this.validInputAttachmentsTypes = true;
    }
  }
  createAttachmentsTypes() {
    const form = new FormData();
    form.append('attachmentTypeId', this.selectAttachments.toString());
    if (this.selectAttachments === 2) {
      form.append(
        'ftp',
        this.ftpAttachmentsTypes + ' ' + this.passftpAttachments
      );
    }
    if (this.selectAttachments === 1 || this.selectAttachments === 3) {
      form.append('file', this.fileAttachmentsTypes);
    }
    form.append('name', this.nameAttachmentsTypes);
    form.append('observations', this.observationsAttachmentsTypes);
    form.append('managerCode', this.selectManager.toString());
    this.serviceWorkspaces
      .createAttachmentsSupply(this.selectMunicipality, form)
      .subscribe((_) => {
        this.toastr.success('Ha agregado correctamente el registro.');
        this.validInputAttachmentsTypes = false;
        this.serviceWorkspaces
          .getSuppliesAttachments(this.selectMunicipality, this.selectManager)
          .subscribe((response) => {
            this.suppliesAttachmentsData = response;
            this.selectAttachments = 0;
            this.nameAttachmentsTypes = '';
            this.ftpAttachmentsTypes = '';
            this.observationsAttachmentsTypes = '';
            this.fileAttachmentsTypes = undefined;
            this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(
              (element) => {
                const isCadastral = element.owners.find(
                  (data) => data.ownerType === 'CADASTRAL_AUTHORITY'
                );
                if (isCadastral) {
                  return element;
                }
              }
            );
          });
      });
  }
  openModalDeliveryInfo(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalDeliveryInfo(option: boolean) {
    this.modalService.dismissAll();
    if (option) {
      this.createAttachmentsTypes();
    }
  }
  openModalDelete(idSupplieDelete: number, modal: any) {
    this.idSupplieDelete = idSupplieDelete;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  deleteSupplies(idSupplie: number, index?: number) {
    this.serviceWorkspaces
      .deleteSupplies(this.idWorkspace, idSupplie)
      .subscribe((_) => {
        this.suppliesAttachmentsData.splice(index, 1);
        this.toastr.success('Se ha eliminado el insumo');
      });
  }
  closeModalDelete(option: boolean, index?: number) {
    this.modalService.dismissAll();
    if (option) {
      this.deleteSupplies(this.idSupplieDelete, index);
    }
  }
  downloadGetReportAuthority() {
    this.serviceWorkspaces
      .getReportAuthority(this.selectMunicipality, this.selectManager)
      .subscribe((data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'reporte-autoridad.pdf');
      });
  }
}
