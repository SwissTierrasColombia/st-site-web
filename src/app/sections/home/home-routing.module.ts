import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: 'inicio',
  component: MainLayoutComponent,
  children: [
    {
      path: '', component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
