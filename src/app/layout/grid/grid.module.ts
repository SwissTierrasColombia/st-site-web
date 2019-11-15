import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from './../../shared';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, GridRoutingModule, PageHeaderModule, NgxSpinnerModule],
    declarations: [GridComponent]
})
export class GridModule {}
