import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

// Modules
import { LayoutModule } from './layouts/layout.module';
import { AuthModule } from './sections/auth/auth.module';
import { HomeModule } from './sections/home/home.module';
import { GeneralModule } from './sections/general/general.module';
import { ManageUsersModule } from './sections/manage-users/manage-users.module';
import { ManageRolesModule } from './sections/manage-roles/manage-roles.module';
import { ManageEntityModule } from './sections/manage-entities/manage-entity.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSpinnerModule } from 'ngx-spinner';

// Models
import { TypeDataFieldModel } from './models/typeDataField.model';

// Services
import { MProcessesService } from './services/process-manager/m-processes.service';
import { RProceduresService } from './services/process-manager/r-procedures.service';
import { RProcessesService } from './services/process-manager/r-processes.service';
import { UsersService } from './services/user/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { TokenInterceptor } from './services/interceptors/token-interceptor.service';
import { ResponseInterceptorService } from './services/interceptors/response.interceptor.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleAdminGuard } from './guards/role-admin-guard.service';
import { RoleModel } from './models/role.model';
import { RoleEntityGuard } from './guards/role-entity-guard.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    HomeModule,
    GeneralModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AccordionModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    TooltipModule,
    NgxSpinnerModule,
    ManageUsersModule,
    ManageRolesModule,
    ManageEntityModule
  ],
  providers: [
    RoleModel,
    AuthGuard,
    RoleAdminGuard,
    RoleEntityGuard,
    MProcessesService,
    RProceduresService,
    RProcessesService,
    UsersService,
    TypeDataFieldModel,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
