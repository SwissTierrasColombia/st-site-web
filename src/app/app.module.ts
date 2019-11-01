import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { LayoutModule } from './layouts/layout.module';
import { HomeModule } from './sections/home/home.module';
import { ErrorModule } from './sections/errors/error.module';

// Services
import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { SessionInterceptorService } from './services/interceptors/session-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    ErrorModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
