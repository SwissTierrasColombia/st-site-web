import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { ManageEntityRoutingModule } from './manage-entity-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { UpdateEntityComponent } from './update-entity/update-entity.component';
import { ListEntityComponent } from './list-entity/list-entity.component';

@NgModule({
  declarations: [
  ListEntityComponent,
  CreateEntityComponent,
  UpdateEntityComponent
],
  imports: [
    CommonModule,
    ManageEntityRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TooltipModule
  ]
})
export class ManageEntityModule { }
