import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
