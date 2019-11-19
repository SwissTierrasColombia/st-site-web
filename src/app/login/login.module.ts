import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule, ReactiveFormsModule
} from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
