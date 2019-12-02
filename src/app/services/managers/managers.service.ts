import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * GetManagers
   */
  public getManagers() {
    return this.httpClient.get(this.url + '/managers/v1/managers?state=1');
  }
  /**
   * getManagersProfiles
   */
  public getManagersProfiles() {
    return this.httpClient.get(this.url + '/managers/v1/profiles');
  }
}
