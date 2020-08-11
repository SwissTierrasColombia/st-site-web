import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public toastrService: ToastrService, private router: Router, private spinner: NgxSpinnerService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      this.spinner.hide();

      const error = err.error.message || err.statusText;

      switch (err.status) {
        case 400:
          if (err.error.error === 'invalid_grant') {
            this.toastrService.error("Autenticación fallida");
          }
          break;
        case 401:
          if (err.error.error === 'invalid_token') {
            localStorage.removeItem(environment.nameTokenSession);
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error(error);
          }
          break;
        case 404:
        case 422:
          this.toastrService.error(error);
          break;
        case 403:
          if (err.error.hasOwnProperty('tokenExpiration')) {
            localStorage.removeItem(environment.nameTokenSession);
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error(error);
          }
          break;
        case 500:
          break;
        case 504:
          break;
        default:
          this.toastrService.error('No se ha podido conectar con el servidor, espere unos minutos he intentelo de nuevo.', 'Actualicé la página', { disableTimeOut: true });
          break;
      }

      return throwError(err);
    }));
  }
}
