import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsComponentRoutingModule } from './bs-component-routing.module';
import { BsComponentComponent } from './bs-component.component';
import {
  AlertComponent,
  ButtonsComponent,
  CollapseComponent,
  DatePickerComponent,
  DropdownComponent,
  PaginationComponent,
  PopOverComponent,
  ProgressbarComponent,
  TabsComponent,
  RatingComponent,
  TooltipComponent,
  TimepickerComponent
} from './components';
import { PageHeaderModule } from '../../shared';
import { ModalBootstrapComponent } from './components/modal-bootstrap/modal-bootstrap.component';

@NgModule({
  imports: [
    CommonModule,
    BsComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PageHeaderModule,
  ],
  declarations: [
    BsComponentComponent,
    ButtonsComponent,
    AlertComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    TabsComponent,
    RatingComponent,
    TooltipComponent,
    TimepickerComponent,
    ModalBootstrapComponent
  ],
  exports: [
  ]
})
export class BsComponentModule { }
