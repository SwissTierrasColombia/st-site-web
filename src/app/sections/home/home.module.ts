import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { HomeRoutingModule } from './home-routing.module';

// Components
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
    providers: [

    ]
})
export class HomeModule { }
