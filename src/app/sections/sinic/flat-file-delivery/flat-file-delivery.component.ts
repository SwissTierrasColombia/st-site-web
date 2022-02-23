import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Commons from '../commons/commons';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { environment } from 'src/environments/environment';
import { ViewportScroller } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { SinicFileUploadComponent } from '../sinic-file-upload/sinic-file-upload.component';
import { SinicIGACService } from '../sinic-igac.service';
import { Categoria, FileIGAC } from '../models/igac-model.interface';
import { SinicService } from '../sinic.service';

@Component({
  selector: 'app-flat-file-delivery',
  templateUrl: './flat-file-delivery.component.html',
  styleUrls: ['./flat-file-delivery.component.scss']
})
export class FlatFileDeliveryComponent implements OnInit {
  
  
  @ViewChild("interesados", { static: false }) interesados: SinicFileUploadComponent;
  @ViewChild("predios", { static: false }) predios: SinicFileUploadComponent;
  @ViewChild("tramites", { static: false }) tramites: SinicFileUploadComponent;
  @ViewChild("terrenos", { static: false }) terrenos: SinicFileUploadComponent;
  @ViewChild("construcciones", { static: false }) construcciones: SinicFileUploadComponent;
  
  
  /* parametros de entrada */
  deliveryId: number;
  selectDepartment: string;
  selectMunicipality: string;
  selectManagerId: string;
  selectStates: string;
  isAdministrator: boolean = false;


  delivery: any = {
    code: '',
    locality: {
      department: '',
      municipality: ''
    },
    manager: {
      name: ''
    },
    date: '',
    dateStatus: ''
  };
  
  tab: number;
  id: number = 0;
  supportFile: string = '';

  formOk: boolean = false;
  listFiles: any = [];
  optionModalRef: NgbModalRef;
  errorXTF: string = '';
  isManager: boolean = false;

  code: string;

  
  verBotonEnviar:boolean = false;
  verBotonLogs: boolean = false;

  constructor(
    private _router: Router,
    private _activedRoute: ActivatedRoute,
    private _sinicService: SinicService,
    private _sinicIgacService: SinicIGACService,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    private scroll: ViewportScroller

  ) { }

  ngOnInit(): void {
    this._activedRoute.params.subscribe((params: Params) => {
      
      const isAdmin = params.isAdministrator;
      this.isAdministrator = (isAdmin == "true");
      this.deliveryId = Number(params.deliveryId);
      this.tab = params.tab;
      const isManager = params.isAdministrator;
      this.isManager = (isManager == "true");;
      this.selectDepartment = params.selectDepartment;
      this.selectMunicipality = params.selectMunicipality;
      this.selectManagerId = params.selectManagerId;
      this.selectStates = params.selectStates;
      this.code = params.code;
      this.findDelivery(this.deliveryId);
    });
  }

  findDelivery(deliveryId: number) {
    
    this._sinicService.searchDelivery(deliveryId).subscribe(element => {
      this.delivery = element;

      console.log(this.delivery);
    });
  

    this.findProcess(deliveryId);
    this.findFiles(deliveryId);

  }

  findProcess(deliveryId: number){
    this._sinicIgacService.obtenerProcesoPorEntrega(deliveryId).subscribe(proceso=>{
      if(proceso){
        this.verBotonEnviar = false;
      }else{
        this.verBotonEnviar = true;
      }
    });
  }

  findFiles(deliveryId: number) {
    this._sinicIgacService.obtenerDocumentosPorEntrega(deliveryId).subscribe(files=>{
      this.interesados.filesIGAC = files.filter(f=> f.categoria==Categoria.INTERESADOS);
      this.predios.filesIGAC = files.filter(f=>f.categoria==Categoria.PREDIO);
      this.tramites.filesIGAC = files.filter(f=>f.categoria==Categoria.TRAMITECATASTRAL);
      this.construcciones.filesIGAC = files.filter(f=>f.categoria==Categoria.CONSTRUCCION);
      this.terrenos.filesIGAC =  files.filter(f=>f.categoria==Categoria.TERRENO);
    });
  }
  
  nameStateDelivery(deliveryStatusId: string): string {
    return Commons.nameStateDelivery(deliveryStatusId);
  }
  
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  
  goBack() {
    this._router.navigate(['/sinic/listar-entregas/' + this.tab,
    {
      isAdministrator: this.isAdministrator,
      isManager: this.isManager,
      selectDepartment: this.selectDepartment,
      selectMunicipality: this.selectMunicipality,
      selectManagerId: this.selectManagerId,
      selectStates: this.selectStates,
      code: this.code,
    }]);

  }


  save() {

    let validado: boolean = true;
    let request:any = {};

    if(this.interesados.filesIGAC.length==0){
      this._toastr.error("Debe cargar al menos un documento en interesados");
      validado = false;
    }else{
      request.interesados = this.interesados.filesIGAC;
    }

    if(this.predios.filesIGAC.length==0){
      this._toastr.error("Debe cargar al menos un documento en predios");
      validado = false;
    }else{      
      request.predios = this.predios.filesIGAC;
    }

    if(this.tramites.filesIGAC.length==0){
      this._toastr.error("Debe cargar al menos un documento en tramites");
      validado = false;
    }else{      
      request.tramites = this.tramites.filesIGAC;
    }

    if(this.terrenos.filesIGAC.length==0){
      this._toastr.error("Debe cargar al menos un documento en terrenos");
      validado = false;
    }else{      
      request.terrenos = this.terrenos.filesIGAC;
    }

    if(this.construcciones.filesIGAC.length==0){
      this._toastr.error("Debe cargar al menos un documento en construcciones");
      validado = false;
    }else{      
      request.construcciones = this.construcciones.filesIGAC;
    }

    request.gestor = this.selectManagerId;
    request.municipio = this.selectMunicipality;
    request.entrega = this.deliveryId;

    if(validado){
      this.optionModalRef = this._modalService.open(ModalComponent, {
        centered: true,
        scrollable: true,
      });
      this.optionModalRef.componentInstance.title =
        'Usted va a REPORTAR la información Catastral del MUNICIPIO  en formato Archivos planos a la Autoridad Catastral.';
      this.optionModalRef.componentInstance.description =
        'Advertencia: ¿Está seguro de hacerlo?';
      this.optionModalRef.result.then((result) => {
        if (result) {
          if (result.option) {
            this._sinicIgacService.procesar(request).subscribe(_ => {
              this._toastr.success('Se ha enviado correctamente a la autoridad catastral');
              this.findDelivery(this.deliveryId);
            });
          }
        }
      });
    }
  }






  cancel() {
    this.id = 0;
    this.formOk = false;
    this.supportFile = '';
  }
  
  downloadLog(item: any) {
    /*
    this.sinicService.downloadLog(this.deliveryId, item.id).subscribe(data => {
      const nameFile = `archivo-${this.delivery.code}-${item.id}`
      FuntionsGlobalsHelper.downloadFile(data, nameFile, '.zip');
    });}*/
  }


  changeNameStateFile(state: string) {
    return Commons.nameStateFile(state);
  }

}
