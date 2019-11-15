import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, BsElementRoutingModule, PageHeaderModule, NgbModule, NgxSpinnerModule],
    declarations: [BsElementComponent]
})
export class BsElementModule {}
