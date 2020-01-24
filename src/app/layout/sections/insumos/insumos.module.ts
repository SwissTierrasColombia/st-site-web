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
import { TooltipModule } from 'ng2-tooltip-directive';
import { DialogBoxComponent } from '../../bs-component/components/dialog-box/dialog-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
@NgModule({
  declarations: [
    CargueComponent,
    SolicitudComponent,
    IntegracionComponent,
    SolicitudesComponent,
    DialogBoxComponent,
  ],
  imports: [
    CommonModule,
    PageHeaderModule,
    InsumosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxPaginationModule,
    NgbModule,
  ],
  bootstrap: [IntegracionComponent],
  providers: [
    TypeDataSuppliesModel
  ]
})
export class InsumosModule { }
