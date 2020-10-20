import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionMunicipioRoutingModule } from './gestion-municipio-routing.module';

import { PageHeaderModule } from 'src/app/shared';
import { WorkspaceComponent } from './workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
import { BsComponentModule } from '../../bs-component/bs-component.module';
import { WorkspaceActiveComponent } from './workspace-active/workspace-active.component';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    WorkspaceComponent,
    OperatorAssignmentComponent,
    WorkspaceActiveComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GestionMunicipioRoutingModule,
    PageHeaderModule,
    BsComponentModule,
    NgSelect2Module,
  ],
})
export class GestionMunicipioModule {}
