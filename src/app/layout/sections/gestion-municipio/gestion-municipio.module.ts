import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { GestionMunicipioRoutingModule } from './gestion-municipio-routing.module';

import { PageHeaderModule } from 'src/app/shared';
import { WorkspaceComponent } from './workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    OperatorAssignmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GestionMunicipioRoutingModule,
    PageHeaderModule
  ]
})
export class GestionMunicipioModule { }
