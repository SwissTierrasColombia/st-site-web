import { WorkspaceRefuseComponent } from './workspace-refuse/workspace-refuse.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionMunicipioRoutingModule } from './gestion-municipio-routing.module';

import { PageHeaderModule } from 'src/app/shared';
import { WorkspaceComponent } from './assign-workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
import { BsComponentModule } from '../../bs-component/bs-component.module';
import { WorkspaceActiveComponent } from './workspace-active/workspace-active.component';
import { NgSelect2Module } from 'ng-select2';
import { SearchWorkspaceComponent } from './search-workspace/search-workspace.component';
import { SuppliesDeliveryComponent } from './supplies-delivery/supplies-delivery.component';
import { NumberDirective } from './numbers-only.directive';
import { TwoDigitDecimaNumberDirective } from './numbers-decimal.directive';

@NgModule({
  declarations: [
    WorkspaceComponent,
    OperatorAssignmentComponent,
    WorkspaceActiveComponent,
    SearchWorkspaceComponent,
    WorkspaceRefuseComponent,
    SuppliesDeliveryComponent,
    NumberDirective,
    TwoDigitDecimaNumberDirective,
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
