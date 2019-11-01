import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { ErrorRoutingModule } from './error-routing.module';

// Components
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';

@NgModule({
    declarations: [
        ErrorNotFoundComponent
    ],
    imports: [
        CommonModule,
        ErrorRoutingModule,
    ],
    providers: [

    ]
})
export class ErrorModule { }
