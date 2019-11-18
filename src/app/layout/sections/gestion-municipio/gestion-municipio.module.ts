import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { GestionMunicipioRoutingModule } from './gestion-municipio-routing.module';

import { GestionComponent } from './gestion/gestion.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [GestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GestionMunicipioRoutingModule,
    PageHeaderModule
  ]
})
export class GestionMunicipioModule { }
