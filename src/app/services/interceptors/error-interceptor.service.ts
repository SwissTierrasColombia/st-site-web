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

  constructor(public toastaService: ToastrService, private router: Router, private spinner: NgxSpinnerService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      this.spinner.hide();

      const error = err.error.message || err.statusText;

      switch (err.status) {
        case 400:
        case 401:
        case 404:
        case 422:
          this.toastaService.error(error);
          break;
        case 403:
          if (err.error.hasOwnProperty('tokenExpiration')) {
            sessionStorage.removeItem(environment.nameTokenSession);
            this.router.navigate(['/autenticacion']);
          } else {
            this.toastaService.error(error);
          }
          break;
        default:
          this.toastaService.error('No se a podido conectar con el servidor', 'Actualiza la pagina');
          break;
      }

      return throwError(err);
    }));
  }
}
