// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';

// Translate
import { AppTranslateModule } from '../modules/app-translate.module';

// Models

@NgModule({
    declarations: [
        MainHeaderComponent,
        MainLayoutComponent,
        MainFooterComponent
    ],
    imports: [
        CommonModule,
        AppTranslateModule,
        RouterModule.forChild([]),
    ],
    exports: [

    ],
    providers: [

    ]
})
export class LayoutModule { }
