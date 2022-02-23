import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { SinicIGACService} from 'src/app/sections/sinic/sinic-igac.service';
import { FileIGAC } from '../models/igac-model.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'sinic-file-upload',
  templateUrl: './sinic-file-upload.component.html',
  styleUrls: ['./sinic-file-upload.component.css']
})
export class SinicFileUploadComponent implements OnInit {

  @Input()
  selectManagerId: string;

  @Input()
  selectMunicipality: string;

  @Input()
  categoria: string;

  @Input()
  extension: string;

  @Input()
  titulo: string;

  @Input()
  deliveryId: number;

  @Input()
  renderDeleteButton:boolean;

  supportFile: string = '';

  @ViewChild('fileUploadArchivo')
  myInputVariable: ElementRef;

  filesIGAC: Array<FileIGAC>;

  optionModalRef: NgbModalRef;


  constructor(
    private _toastr: ToastrService, 
    private _sinicIgacService: SinicIGACService,
    private _modalService: NgbModal) {
     
  }

  ngOnInit() {
    this.filesIGAC = [];

  }

  docSoport(file: File) {
    console.log(file);
    if (file[0].size / 1024 / 1024 <= environment.sizeFile) {
      const re = /zip*/;
      if (file[0].type.match(re)) {
        //this.supportFile = file[0];
        //this.changeData();
        this.uploadFile(file[0]);
      } else {
        this.supportFile = '';
        this.myInputVariable.nativeElement.value = '';
        this._toastr.error('Solo se permiten archivos ZIP');
      }
    } else {
      this.supportFile = '';
      this.myInputVariable.nativeElement.value = '';
      this._toastr.error(
        'No se puede cargar el archivo, supera el tamaño máximo permitido de 190 MB.'
      );
    }
  }  

  uploadFile(file : File) {
    try {
      let request: any = {};
      request.municipio = {codigo:this.selectMunicipality};
      request.categoria = this.categoria;
      request.entrega = this.deliveryId;

      this._sinicIgacService.uploadFile(request, file).subscribe(rta=>{
        this.filesIGAC.push(rta); 
        this._toastr.success("Se cargo exitosamente el archivo");
      }, error=>{
        this._toastr.error(`Error al cargar el archivo: ${error.error.error}`);
      });
      this.myInputVariable.nativeElement.value = '';
    } catch (error) {
      this.myInputVariable.nativeElement.value = '';  
      this._toastr.error( "Error al cargar el archivo");
    }
  }

  abrirModalEliminarArchivo(item: FileIGAC) {
    this.optionModalRef = this._modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de eliminar el archivo de la entrega?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Va a eliminar este archivo, al aceptar no se podrá recuperar.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.eliminar(item);
        }
      }
    });
  }

  descargar(archivo: FileIGAC){
    this._sinicIgacService.downloadFile(archivo.uuid).subscribe(rta => {
      var link = document.createElement('a');
      link.href = "data:text/plain; base64, " + rta.archivo;
      link.download = rta.nombre;
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
        link.remove();
      }, 100);
    }, error => {
      this._toastr.error("Error al descargar el archivo");
    });
  }

  eliminar(archivo: FileIGAC){
    this._sinicIgacService.deleteFile(archivo.uuid).subscribe(rta=>{
      for(let i=this.filesIGAC.length-1; i>-1;i--){
        if(archivo.uuid==this.filesIGAC[i].uuid){
          this.filesIGAC = this.filesIGAC.splice(i+1,1);
        }
      }

      this._toastr.success("Se eliminó el archivo");
    });
  }
  

}
