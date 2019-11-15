import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, NgxSpinnerModule],
    declarations: [FormComponent]
})
export class FormModule {}
