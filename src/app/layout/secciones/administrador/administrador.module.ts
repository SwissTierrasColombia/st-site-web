import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsComponentModule } from '../../bs-component/bs-component.module';

@NgModule({
  declarations: [CreateUserComponent, ListUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    PageHeaderModule,
    NgbModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsComponentModule
  ],
  providers: [
    FuntionsGlobalsHelper
  ],
  bootstrap: [ListUserComponent],
})
export class AdministradorModule { }
