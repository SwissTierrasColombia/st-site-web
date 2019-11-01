import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Libraries
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private translate: TranslateService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {

      switch (err.status) {
        case 400:
          break;
        case 401:
          break;
        case 403:
          break;
        case 404:
          break;
        case 422:
          break;
        default:

          break;
      }
      return throwError(err);
    }));
  }

}
