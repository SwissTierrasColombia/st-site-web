import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * getUserById
   */
  public getUserById(idUser: number) {
    return this.httpClient.get(this.url + '/administration/v1/users/' + idUser);
  }
  /**
   * getAllUsers
   */
  public getAllUsers() {
    return this.httpClient.get(this.url + '/administration/v1/users');
  }
}
