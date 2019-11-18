import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
  {
    path: 'municipio',
    component: GestionComponent
  },
  {
    path: 'workspace',
    component: WorkspaceComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMunicipioRoutingModule { }
