import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { PageHeaderModule } from 'src/app/shared';



@NgModule({
  declarations: [CreateUserComponent, ListUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    PageHeaderModule

  ],
  providers: [
    FuntionsGlobalsHelper
  ]
})
export class AdministradorModule { }
