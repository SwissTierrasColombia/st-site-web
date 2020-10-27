import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumosRoutingModule } from './insumos-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeDataSuppliesModel } from 'src/app/models/typeDataSupplies.model';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsComponentModule } from '../../bs-component/bs-component.module';
import { NgSelect2Module } from 'ng-select2';
import { PreviewComponent } from '../../components/preview/preview.component';
import { AtendidaComponent } from './attended/atendida.component';
import { CrearTipoInsumoComponent } from './create-supplie-type/crear-tipo-insumo.component';
import { EntregarComponent } from './deliver-supplie/entregar.component';
import { IntegracionComponent } from './integration/integracion.component';
import { IntegrationsPossiblesComponent } from './integrations-possibles/integrations-possibles.component';
import { IntegrationsRunningComponent } from './integrations-running/integrations-running.component';
import { CargueComponent } from './load-supplies/cargue.component';
import { RevisionesPendientesComponent } from './pending-reviews/revisiones-pendientes.component';
import { SolicitudComponent } from './providers-request/solicitud.component';
import { PeticionComponent } from './request-manager/peticion.component';
import { PeticionesProveedorComponent } from './request-providers/peticiones-proveedor.component';
import { SolicitudesAtendidasComponent } from './requests-attended-provider/solicitudes-atendidas.component';
import { SolicitudesComponent } from './requests-manager/solicitudes.component';
import { RevisionPendienteComponent } from './review-pending/revision-pendiente.component';
import { SearchComponent } from './search/search.component';
import { BuscarSolicitudComponent } from './search-request/buscar-solicitud.component';
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
    PeticionesProveedorComponent,
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
    NgSelect2Module,
  ],
  bootstrap: [IntegracionComponent],
  providers: [TypeDataSuppliesModel],
})
export class InsumosModule {}
