import { SuppliesDeliveryComponent } from './supplies-delivery/supplies-delivery.component';
import { WorkspaceRefuseComponent } from './workspace-refuse/workspace-refuse.component';
import { SearchWorkspaceComponent } from './search-workspace/search-workspace.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './assign-workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
import { WorkspaceActiveComponent } from './workspace-active/workspace-active.component';

const routes: Routes = [
  {
    path: 'workspace',
    component: WorkspaceComponent,
  },
  {
    path: 'workspace/active',
    component: WorkspaceActiveComponent,
  },
  {
    path: 'workspace/:idWorkspace/operador',
    component: OperatorAssignmentComponent,
  },
  {
    path: 'workspace/asignado',
    component: SearchWorkspaceComponent,
  },
  {
    path: 'workspace/delivery',
    component: SuppliesDeliveryComponent,
  },
  {
    path: 'workspace/refuse',
    component: WorkspaceRefuseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionMunicipioRoutingModule {}
