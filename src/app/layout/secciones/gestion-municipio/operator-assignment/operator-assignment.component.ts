import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from 'src/app/services/operators/operators.service';
import { JwtHelper } from 'src/app/helpers/jwt';
import { RoleModel } from 'src/app/helpers/role.model';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { InsumosService } from 'src/app/services/insumos/insumos.service';



const moment = _moment;
@Component({
  selector: 'app-operator-assignment',
  templateUrl: './operator-assignment.component.html',
  styleUrls: ['./operator-assignment.component.scss']
})

export class OperatorAssignmentComponent implements OnInit {

  dataWorkSpace: any;
  tab: number;
  departaments: any;
  munucipalities: any;
  selectDepartment: number;
  selectMunicipality: number;
  editForm: any;
  idWorkspace: number;
  dataSoports: any;
  operators: any;
  selectOperator: number;
  dataOperatorsWorkSpace: any;
  supportFileOperator: any;
  updateInfoBasic: boolean;
  replaceOperator: boolean;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  assingOperator: boolean;
  dataAttachmentsTypes: any;
  selectAttachments: number;
  observationsAttachmentsTypes: string;
  ftpAttachmentsTypes: string;
  validInputAttachmentsTypes: boolean;
  fileAttachmentsTypes: any;
  suppliesAttachmentsData: any;
  idSupplieDelete: number;
  idWorkSpaceMunicipality: number;
  isChangeDataOperator: boolean;
  nameAttachmentsTypes: string;
  passftpAttachments: string;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private serviceWorkspaces: WorkspacesService,
    private toastr: ToastrService,
    private serviceOperators: OperatorsService,
    private roles: RoleModel,
    private modalService: NgbModal,
    private insumosService: InsumosService

  ) {
    this.dataWorkSpace = {
      manager: {},
      municipality: {
        department: {}
      }
    };
    this.tab = 1;
    this.idWorkspace = 0;
    this.departaments = [];
    this.munucipalities = [];
    this.selectDepartment = 0;
    this.selectMunicipality = 0;
    this.editForm = {
      municipalityArea: true,
      numberAlphanumericParcels: true,
      startDate: true,
      observations: true
    };
    this.dataSoports = [];
    this.operators = [];
    this.selectOperator = 0;
    this.dataOperatorsWorkSpace = {
      startDate: '',
      endDate: '',
      numberParcelsExpected: 0,
      workArea: 0,
      observations: '',
      operatorCode: 0
    };
    this.updateInfoBasic = false;
    this.assingOperator = false;
    this.replaceOperator = false;
    this.dataAttachmentsTypes = [];
    this.selectAttachments = 0;
    this.observationsAttachmentsTypes = '';
    this.ftpAttachmentsTypes = '';
    this.validInputAttachmentsTypes = false;
    this.suppliesAttachmentsData = [];
    this.isChangeDataOperator = false;
    this.nameAttachmentsTypes = '';
    this.passftpAttachments = '';
  }

  ngOnInit() {
    const rol = JwtHelper.getUserPublicInformation();
    const roleAdmin = rol.roles.find((elem: any) => {
      return elem.id === this.roles.administrador;
    });
    if (roleAdmin) {
      this.updateInfoBasic = true;
    }
    const roleManager = rol.roles.find((elem: any) => {
      return elem.id === this.roles.gestor;
    });
    if (roleManager) {
      this.assingOperator = true;
    }
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departaments = response;
      });
    this.activedRoute.params.subscribe(
      response => {
        this.selectMunicipality = response.idWorkspace;
        if (response.tab) {
          this.tab = Number(response.tab);
        }
      }
    );

    const promise1 = new Promise((resolve) => {
      this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
        (response: any) => {
          this.idWorkspace = response.id;
          resolve(response);
        }
      );
    });
    Promise.all([promise1]).then((values: any) => {
      this.serviceWorkspaces.getWorkSpace(this.idWorkspace).subscribe(
        (response: any) => {
          this.dataWorkSpace = response;
          this.selectDepartment = this.dataWorkSpace.municipality.department.id;
          if (this.dataWorkSpace.operators.length > 0) {
            this.replaceOperator = true;
            this.dataOperatorsWorkSpace = this.clone(this.dataWorkSpace.operators[0]);
            const startDate = this.dataWorkSpace.operators[0].startDate.split('T')[0];
            const endDate = this.dataWorkSpace.operators[0].endDate.split('T')[0];
            this.dataOperatorsWorkSpace.startDate = this.formatDateOperator(startDate);
            this.dataOperatorsWorkSpace.endDate = this.formatDateOperator(endDate);
          }
        }
      );
      if (this.tab === 2) {
        this.serviceWorkspaces.getSupportsByWorkSpace(this.idWorkspace).subscribe(response => {
          this.dataSoports = response;
        });
      }
      if (this.tab === 3) {
        this.serviceOperators.getOperatorsByFilters().subscribe(
          response => {
            this.operators = response;
          }
        );
      }
      if (this.tab === 4) {
        this.insumosService.GetAttachmentsTypes().subscribe(data => {
          this.dataAttachmentsTypes = data;
        });
        this.serviceWorkspaces.getSuppliesAttachments(this.selectMunicipality).subscribe(response => {
          this.suppliesAttachmentsData = response;
          this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(element => {
            const isCadastral = element.owners.find(data => data.ownerType === 'CADASTRAL_AUTHORITY');
            if (isCadastral) {
              return element;
            }
          });
        });
      }
      if (this.tab === 5) {
        this.serviceWorkspaces.getSuppliesAttachments(this.selectMunicipality).subscribe(response => {
          this.suppliesAttachmentsData = response;
          this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(element => {
            const isCadastral = element.owners.find(data => data.ownerType === 'CADASTRAL_AUTHORITY');
            if (isCadastral) {
              return element;
            }
          });
        });
      }
    });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  init() {
    const rol = JwtHelper.getUserPublicInformation();
    const roleManager = rol.roles.find((elem: any) => {
      return elem.id === this.roles.gestor;
    });
    if (roleManager) {
      this.assingOperator = true;
    }
    const roleAdmin = rol.roles.find((elem: any) => {
      return elem.id === this.roles.administrador;
    });
    if (roleAdmin) {
      this.updateInfoBasic = true;
    }
    this.serviceWorkspaces.getDepartments()
      .subscribe(response => {
        this.departaments = response;
      });
    this.activedRoute.params.subscribe(
      response => {
        this.selectMunicipality = response.idWorkspace;
        if (response.tab) {
          this.tab = Number(response.tab);
        }
      }
    );

    const promise1 = new Promise((resolve) => {
      this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
        (response: any) => {
          this.idWorkspace = response.id;
          resolve(response);
        }
      );
    });
    Promise.all([promise1]).then((values: any) => {
      this.serviceWorkspaces.getWorkSpace(this.idWorkspace).subscribe(
        (response: any) => {
          this.dataWorkSpace = response;
          if (this.dataWorkSpace.operators.length > 0) {
            this.replaceOperator = true;
            this.dataOperatorsWorkSpace = this.clone(this.dataWorkSpace.operators[0]);
            const startDate = this.dataWorkSpace.operators[0].startDate.split('T')[0];
            const endDate = this.dataWorkSpace.operators[0].endDate.split('T')[0];
            this.dataOperatorsWorkSpace.startDate = this.formatDateOperator(startDate);
            this.dataOperatorsWorkSpace.endDate = this.formatDateOperator(endDate);
          }
        }
      );
      if (this.tab === 2) {
        this.serviceWorkspaces.getSupportsByWorkSpace(this.idWorkspace).subscribe(response => {
          this.dataSoports = response;
        });
      }
      if (this.tab === 3) {
        this.serviceOperators.getOperatorsByFilters().subscribe(
          response => {
            this.operators = response;
          }
        );
      }
    });
  }

  docSoport(files: FileList) {
    this.changeDataOperator();
    if (files[0].size / 1024 / 1024 <= environment.sizeFile) {
      var re = /zip*/;
      if (files[0].type.match(re)) {
        this.supportFileOperator = files[0];
      } else {
        if (files[0].size / 1024 / 1024 > environment.sizeFileUnZip) {
          this.toastr.error('Por favor convierta el archivo en .zip antes de subirlo, ya que supera el tamaño de cargue permitido.')
          this.supportFileOperator = undefined;
          this.myInputVariable.nativeElement.value = '';
        } else {
          this.supportFileOperator = files[0];
        }
      }
    } else {
      this.supportFileOperator = undefined;
      this.myInputVariable.nativeElement.value = '';
      this.toastr.error('No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.');
    }
  }

  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll, h:mm a');
  }
  formatDateCalendar(date: string) {
    moment.locale('es');
    return moment(date).format('ll');
  }
  formatDateOperator(date: string) {
    moment.locale('es');
    return moment(date).format('YYYY-MM-DD');
  }
  volver() {
    this.router.navigate(['/gestion/workspace',
      { selectDepartment: this.selectDepartment, selectMunicipality: this.selectMunicipality }
    ]);
  }
  changeUpdate() {
    this.editForm = {
      municipalityArea: false,
      numberAlphanumericParcels: false,
      startDate: false,
      observations: false
    };
  }
  update() {
    const dataUpdate = new FormData();
    dataUpdate.append('startDate', this.dataWorkSpace.startDate);
    dataUpdate.append('observations', this.dataWorkSpace.observations);
    dataUpdate.append('numberAlphanumericParcels', this.dataWorkSpace.numberAlphanumericParcels);
    dataUpdate.append('municipalityArea', this.dataWorkSpace.municipalityArea);
    this.serviceWorkspaces.updateWorkSpace(this.idWorkspace, dataUpdate).subscribe(_ => {
      this.editForm = {
        municipalityArea: true,
        numberAlphanumericParcels: true,
        startDate: true,
        observations: true
      };
      this.toastr.success('Información Actualizada');
    });
  }
  tab1() {
    this.tab = 1;
    this.router.navigate(['gestion/workspace/' + this.selectMunicipality + '/operador', { tab: 1 }]);
  }
  getSopports() {
    this.tab = 2;
    this.router.navigate(['gestion/workspace/' + this.selectMunicipality + '/operador', { tab: 2 }]);
    this.init();
  }
  getOperator() {
    this.tab = 3;
    this.router.navigate(['gestion/workspace/' + this.selectMunicipality + '/operador', { tab: 3 }]);
    this.init();
  }
  assingOperatorInWorkSpace() {
    const dataOperator = new FormData();
    dataOperator.append('supportFile', this.supportFileOperator);
    dataOperator.append('startDate', this.dataOperatorsWorkSpace.startDate);
    dataOperator.append('endDate', this.dataOperatorsWorkSpace.endDate);
    dataOperator.append('numberParcelsExpected', this.dataOperatorsWorkSpace.numberParcelsExpected);
    dataOperator.append('operatorCode', this.dataOperatorsWorkSpace.operatorCode);
    dataOperator.append('workArea', this.dataOperatorsWorkSpace.workArea);
    dataOperator.append('observations', this.dataOperatorsWorkSpace.observations);
    const numberAlphanumericParcels = Number.isInteger(this.dataOperatorsWorkSpace.numberParcelsExpected);
    const workArea = Number.isInteger(this.dataOperatorsWorkSpace.workArea);
    if (this.supportFileOperator === undefined) {
      this.toastr.error('No se ha cargado ningún soporte.');
    } else if (this.dataOperatorsWorkSpace.observations === '') {
      this.toastr.error('Las observaciones son obligatorias.');
    } else if (!numberAlphanumericParcels) {
      this.toastr.error('El número de predios a intervenir debe ser de tipo numérico.');
    } else if (this.dataOperatorsWorkSpace.numberParcelsExpected < 0) {
      this.toastr.error('El número de predios no es correcto.');
    } else if (!workArea) {
      this.toastr.error('El área de trabajo debe ser de tipo numérico.');
    } else if (this.dataOperatorsWorkSpace.workArea < 0) {
      this.toastr.error('El área de trabajo no es correcta.');
    }
    else {
      this.serviceWorkspaces.assingOperatorToWorkSpace(this.idWorkspace, dataOperator).subscribe(
        _ => {
          this.toastr.success('Operador asignado satisfactoriamente');
          this.serviceWorkspaces.getWorkSpaceActiveByMunicipality(this.selectMunicipality).subscribe(
            (data: any) => {
              this.idWorkspace = data.id;
              this.serviceWorkspaces.getWorkSpace(this.idWorkspace).subscribe(
                response => {
                  this.dataWorkSpace = response;
                  if (this.dataWorkSpace.operators.length > 0) {
                    this.replaceOperator = true;
                    this.dataOperatorsWorkSpace = this.clone(this.dataWorkSpace.operators[0]);
                    const startDate = this.dataWorkSpace.operators[0].startDate.split('T')[0];
                    const endDate = this.dataWorkSpace.operators[0].endDate.split('T')[0];
                    this.dataOperatorsWorkSpace.startDate = this.formatDateOperator(startDate);
                    this.dataOperatorsWorkSpace.endDate = this.formatDateOperator(endDate);
                  }
                }
              );
            }
          );
        }
      );
    }
  }
  closeModal(option: boolean) {
    if (option) {
      this.assingOperatorInWorkSpace();
    }
    this.modalService.dismissAll();
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.update();
    }
  }
  downloadSupplies(idSupport: number) {
    this.serviceWorkspaces.downloadSupport(this.idWorkspace, idSupport).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'soporte.zip');
      }
    );
  }
  openModalUpdate(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalUpdate(option: boolean) {
    if (option) {
      this.update();
      this.modalService.dismissAll();
    } else {
      this.modalService.dismissAll();
    }
  }
  tab4() {
    this.tab = 4;
    this.router.navigate(['gestion/workspace/' + this.selectMunicipality + '/operador', { tab: 4 }]);
    this.insumosService.GetAttachmentsTypes().subscribe(data => {
      this.dataAttachmentsTypes = data;
    });
    this.serviceWorkspaces.getSuppliesAttachments(this.selectMunicipality).subscribe(response => {
      this.suppliesAttachmentsData = response;
      this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(element => {
        const isCadastral = element.owners.find(data => data.ownerType === 'CADASTRAL_AUTHORITY');
        if (isCadastral) {
          return element;
        }
      });
    });
  }
  tab5() {
    this.tab = 5;
    this.router.navigate(['gestion/workspace/' + this.selectMunicipality + '/operador', { tab: 5 }]);
    this.serviceWorkspaces.getSuppliesAttachments(this.selectMunicipality).subscribe(response => {
      this.suppliesAttachmentsData = response;
      this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(element => {
        const isCadastral = element.owners.find(data => data.ownerType === 'CADASTRAL_AUTHORITY');
        if (isCadastral) {
          return element;
        }
      });
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
          this.toastr.error('Por favor convierta el archivo en .zip antes de subirlo, ya que supera el tamaño de cargue permitido.')
        } else {
          this.fileAttachmentsTypes = files[0];
          this.validInputAttachmentsTypes = false;
          if (this.selectAttachments !== 0 && this.observationsAttachmentsTypes !== ''
            && (this.fileAttachmentsTypes !== undefined || this.ftpAttachmentsTypes !== '')) {
            this.validInputAttachmentsTypes = true;
          }
        }
      }
    } else {
      this.toastr.error('No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.');
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
    if (this.selectAttachments !== 0 && this.observationsAttachmentsTypes !== '' && this.nameAttachmentsTypes !== ''
      && (this.fileAttachmentsTypes !== undefined || this.ftpAttachmentsTypes !== '')) {
      this.validInputAttachmentsTypes = true;
    }
  }
  createAttachmentsTypes() {
    const form = new FormData();
    form.append('attachmentTypeId', this.selectAttachments.toString());
    if (this.selectAttachments === 2) {
      form.append('ftp', this.ftpAttachmentsTypes + ' '+ this.passftpAttachments);
    }
    if (this.selectAttachments === 1 || this.selectAttachments === 3) {
      form.append('file', this.fileAttachmentsTypes);
    }
    form.append('name', this.nameAttachmentsTypes);
    form.append('observations', this.observationsAttachmentsTypes);
    this.serviceWorkspaces.createAttachmentsSupply(this.selectMunicipality, form).subscribe(
      _ => {
        this.toastr.success('Ha agregado correctamente el registro.');
        this.validInputAttachmentsTypes = false;
        this.serviceWorkspaces.getSuppliesAttachments(this.selectMunicipality).subscribe(response => {
          this.suppliesAttachmentsData = response;
          this.selectAttachments = 0;
          this.nameAttachmentsTypes = '';
          this.ftpAttachmentsTypes = '';
          this.observationsAttachmentsTypes = '';
          this.fileAttachmentsTypes = undefined;
          this.suppliesAttachmentsData = this.suppliesAttachmentsData.filter(element => {
            const isCadastral = element.owners.find(data => data.ownerType === 'CADASTRAL_AUTHORITY');
            if (isCadastral) {
              return element;
            }
          });
        });
      }
    );
  }
  deleteSupplies(idSupplie: number, index?: number) {
    this.serviceWorkspaces.deleteSupplies(this.idWorkspace, idSupplie).subscribe(
      _ => {
        this.suppliesAttachmentsData.splice(index, 1);
        this.toastr.success('Se ha eliminado el insumo');
      }
    );
  }
  closeModalDelete(option: boolean, index?: number) {
    this.modalService.dismissAll();
    if (option) {
      this.deleteSupplies(this.idSupplieDelete, index);
    }
  }
  openModalDelete(idSupplieDelete: number, modal: any) {
    this.idSupplieDelete = idSupplieDelete;
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  changeDataOperator(){
    this.isChangeDataOperator = true;
  }
  downloadSuppliesAutoridad(idSupplie: number, nameSupplie: string) {
    this.serviceWorkspaces.downloadSupplie(idSupplie).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, nameSupplie + '.zip');
      }
    );
  }
  downloadGetReportAuthority() {
    this.serviceWorkspaces.getReportAuthority(this.selectMunicipality).subscribe(
      (data: any) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'reporte-autoridad.pdf');
      }
    );
  }

}
