import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * GetAllUsers
   */
  public getAllUsers() {
    return this.httpClient.get(this.url + '/administration/v1/users');
  }
  /**
   * get Manager User
   */
  public getManagerUser(managerId: number) {
    if (managerId !== 0) {
      return this.httpClient.get(
        this.url + '/administration/v1/users/managers?manager=' + managerId
      );
    }
    return this.httpClient.get(this.url + '/administration/v1/users/managers');
  }
  /**
   * get Provider User
   */
  public getProviderUser(providerId: number) {
    if (providerId !== 0) {
      return this.httpClient.get(
        this.url + '/administration/v1/users/providers?provider=' + providerId
      );
    }
    return this.httpClient.get(this.url + '/administration/v1/users/providers');
  }
  /**
   * get Operator User
   */
  public getOperatorUser(operatorId: number) {
    if (operatorId !== 0) {
      return this.httpClient.get(
        this.url + '/administration/v1/users/operators?operator=' + operatorId
      );
    }
    return this.httpClient.get(this.url + '/administration/v1/users/operators');
  }
}
