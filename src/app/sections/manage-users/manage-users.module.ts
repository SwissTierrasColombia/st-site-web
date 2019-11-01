import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TooltipModule
  ]
})
export class ManageUsersModule { }
