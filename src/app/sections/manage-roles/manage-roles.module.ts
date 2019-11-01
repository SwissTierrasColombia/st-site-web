import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { UpdateRolesComponent } from './update-roles/update-roles.component';

@NgModule({
  declarations: [
  ListRolesComponent,
  CreateRolesComponent,
  UpdateRolesComponent
],
  imports: [
    CommonModule,
    ManageRolesRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TooltipModule
  ]
})
export class ManageRolesModule { }
