import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { PocRoutingModule } from './poc-routing.module';
import { PocComponent } from './poc.component';
@NgModule({
  declarations: [
    PocComponent
  ],

  imports: [
    CommonModule, PageHeaderModule, PocRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class PocModule { }
