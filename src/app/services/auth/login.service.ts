import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  data = [];
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  login(username: string, password: string): Observable<any> {
    const encoded = btoa(environment.clientUsername + ':' + environment.clientPassword);
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.httpClient.post(this.url + '/security/oauth/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Basic ' + encoded)
      }
    );
  }
  getSessions() {
    return this.httpClient.get<any>(this.url + '/auth/session', { observe: 'response' });
  }
  logout() {
    localStorage.removeItem(environment.nameTokenSession);
  }
}
