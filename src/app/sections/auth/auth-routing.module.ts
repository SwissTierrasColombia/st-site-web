import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


const routes: Routes = [{
  path: 'autenticacion',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'registro', component: RegisterComponent
    },
    {
      path: 'recuperar', component: RecoverPasswordComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
