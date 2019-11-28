import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumosRoutingModule } from './insumos-routing.module';
import { CargueComponent } from './cargue/cargue.component';
import { PageHeaderModule } from 'src/app/shared';
import { SolicitudComponent } from './solicitud/solicitud.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { IntegracionComponent } from './integracion/integracion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';
@NgModule({
  declarations: [CargueComponent, SolicitudComponent, IntegracionComponent, SolicitudesComponent],

  imports: [
    CommonModule, PageHeaderModule, InsumosRoutingModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [
    TypeDataSuppliesModel
  ]
})
export class InsumosModule { }
