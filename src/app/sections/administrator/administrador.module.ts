import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { GestorComponent } from './manager/gestor.component';
import { ProveedorComponent } from './provider/proveedor.component';
import { OperadorComponent } from './operator/operador.component';
import { NgSelect2Module } from 'ng-select2';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    ProfilesComponent,
    GestorComponent,
    ProveedorComponent,
    OperadorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    PageHeaderModule,
    NgbModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelect2Module,
    ComponentsModule,
  ],
  providers: [FuntionsGlobalsHelper],
  bootstrap: [ListUserComponent],
})
export class AdministradorModule {}
