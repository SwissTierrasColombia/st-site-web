import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
import { OperatorViewComponent } from './operator-view/operator-view.component';

const routes: Routes = [
  {
    path: 'workspace',
    component: WorkspaceComponent
  },
  {
    path: 'workspace/:idWorkspace/operador',
    component: OperatorAssignmentComponent
  }
  ,
  {
    path: 'workspace/:idWorkspace/ver/operador',
    component: OperatorViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMunicipioRoutingModule { }
