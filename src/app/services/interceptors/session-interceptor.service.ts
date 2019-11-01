import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SessionInterceptorService {

  constructor(public translate: TranslateService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem(environment.nameTokenSession);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    const language = this.translate.currentLang;
    if (language) {
      request = request.clone({
        setHeaders: {
          language
        }
      });
    }

    return next.handle(request);
  }

}
