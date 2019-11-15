import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule,
        NgxSpinnerModule],
    declarations: [TablesComponent]
})
export class TablesModule { }
