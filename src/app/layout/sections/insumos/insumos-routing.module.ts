import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargueComponent } from './cargue/cargue.component';
import { SolicitudComponent } from './solicitud/solicitud.component';


const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudComponent
  },
  {
    path: 'cargue',
    component: CargueComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumosRoutingModule { }
