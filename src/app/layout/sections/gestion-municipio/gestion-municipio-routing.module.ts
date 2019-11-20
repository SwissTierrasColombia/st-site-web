import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';

const routes: Routes = [
  {
    path: 'workspace',
    component: WorkspaceComponent
  },
  {
    path: 'operador',
    component: OperatorAssignmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMunicipioRoutingModule { }
