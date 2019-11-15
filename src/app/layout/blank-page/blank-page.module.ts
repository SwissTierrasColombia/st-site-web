import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, BlankPageRoutingModule, NgxSpinnerModule],
    declarations: [BlankPageComponent]
})
export class BlankPageModule {}
