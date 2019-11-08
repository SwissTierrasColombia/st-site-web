import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  data = [];
  apiURL: string;
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiBaseUrlPrefix;
    this.baseUrl = environment.apiBaseUrl;
  }
  login(username: string, password: string) {
    const data = {
      username,
      password
    };
    return this.httpClient.post<any>(this.apiURL + '/st/account/login', data, { observe: 'response' });
  }
  getSessions() {
    return this.httpClient.get<any>(this.baseUrl + '/auth/session', { observe: 'response' });
  }
  logout() {
    sessionStorage.removeItem(environment.nameTokenSession);
  }
  registerUser(data: any) {
    return this.httpClient.post<any>(this.apiURL + '/st/account/register', data, { observe: 'response' });
  }
  restorePassword(data: any) {
    return this.httpClient.put(this.apiURL + '/st/account/restore', data);
  }
  updatePassword(data: any) {
    return this.httpClient.put(this.apiURL + '/st/account/update', data);
  }
}
