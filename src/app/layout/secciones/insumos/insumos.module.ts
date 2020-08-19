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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './buscar/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EntregarComponent } from './entregar/entregar.component';
import { BsComponentModule } from '../../bs-component/bs-component.module';
import { SolicitudesAtendidasComponent } from './solicitudes-atendidas/solicitudes-atendidas.component';
import { AtendidaComponent } from './atendida/atendida.component';
import { CrearTipoInsumoComponent } from './crear-tipo-insumo/crear-tipo-insumo.component';
import { BuscarSolicitudComponent } from './buscar-solicitud/buscar-solicitud.component';
import { NgSelect2Module } from 'ng-select2';
import { PreviewComponent } from '../../components/preview/preview.component';
import { IntegrationsRunningComponent } from './integrations-running/integrations-running.component';
import { IntegrationsPossiblesComponent } from './integrations-possibles/integrations-possibles.component';
import { RevisionesPendientesComponent } from './revisiones-pendientes/revisiones-pendientes.component';
import { RevisionPendienteComponent } from './revision-pendiente/revision-pendiente.component';
import { PeticionComponent } from './peticion-gestor/peticion.component';
import { PeticionesProveedorComponent } from './peticiones-proveedor/peticiones-proveedor.component';

@NgModule({
  declarations: [
    CargueComponent,
    SolicitudComponent,
    IntegracionComponent,
    SolicitudesComponent,
    SearchComponent,
    EntregarComponent,
    SolicitudesAtendidasComponent,
    AtendidaComponent,
    CrearTipoInsumoComponent,
    BuscarSolicitudComponent,
    PreviewComponent,
    IntegrationsRunningComponent,
    IntegrationsPossiblesComponent,
    RevisionesPendientesComponent,
    RevisionPendienteComponent,
    PeticionComponent,
    PeticionesProveedorComponent
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
    Ng2SearchPipeModule,
    BsComponentModule,
    NgSelect2Module
  ],
  bootstrap: [IntegracionComponent],
  providers: [
    TypeDataSuppliesModel
  ]
})
export class InsumosModule { }
