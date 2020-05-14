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
  /**
   * getAllManagers
   */
  public getAllManagers() {
    return this.httpClient.get(this.url + '/managers/v1/managers');
  }
  /**
   * createManager
   */
  public createManager(data: any) {
    return this.httpClient.post(this.url + '/managers/v1/managers', data);
  }
  /**
   * updateManager
   */
  public updateManager(data: any) {
    return this.httpClient.put(this.url + '/managers/v1/managers', data);
  }
  /**
   * disableManager
   */
  public disableManager(id: number) {
    return this.httpClient.put(this.url + '/managers/v1/managers/' + id + '/disable', {});
  }
  /**
 * enableManager
 */
  public enableManager(id: number) {
    return this.httpClient.put(this.url + '/managers/v1/managers/' + id + '/enable', {});
  }
}
