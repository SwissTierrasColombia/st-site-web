import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumosRoutingModule } from './insumos-routing.module';
import { CargueComponent } from './cargue/cargue.component';
import { PageHeaderModule } from 'src/app/shared';
import { SolicitudComponent } from './solicitud/solicitud.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IntegracionComponent } from './integracion/integracion.component';
@NgModule({
  declarations: [CargueComponent, SolicitudComponent, IntegracionComponent],
  
  imports: [CommonModule, PageHeaderModule, InsumosRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgxSpinnerModule]
})
export class InsumosModule { }
