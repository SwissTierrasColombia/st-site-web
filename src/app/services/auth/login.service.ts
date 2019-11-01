import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  data = [];
  apiURL: string;
  baseUrl: String;

  constructor(private httpClient: HttpClient, private route: Router, private toastr: ToastrService) {
    this.apiURL = environment.apiBaseUrlPrefix;
    this.baseUrl = environment.apiBaseUrl;
  }
  login(username: string, password: string) {
    let data = {
      username,
      password
    }
    return this.httpClient.post<any>(this.apiURL + '/vu/account/login', data, { observe: 'response' });
  }
  getSessions() {
    return this.httpClient.get<any>(this.baseUrl + '/auth/session', { observe: 'response' });
  }
  logout() {
    sessionStorage.removeItem(environment.nameTokenSession);
  }
  registerUser(data: any) {
    return this.httpClient.post<any>(this.apiURL + '/vu/account/register', data, { observe: 'response' });
  }
  restorePassword(data: any) {
    return this.httpClient.put(this.apiURL + '/vu/account/restore', data)
  }
  updatePassword(data: any) {
    return this.httpClient.put(this.apiURL + '/vu/account/update', data)

  }
}