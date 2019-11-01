import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PDomainsService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  public GetTypeDataStepsProcess() {
    return this.httpClient.get<any>(this.url + '/p/domains/types-data');

  }
  /**
   * Get Types Callbacks
   */
  public GetTypesCallbacks() {
    return this.httpClient.get<any>(this.url + '/p/domains/types-callback')
  }
  /**
   * Get Types Operators
   */
  public GetTypesOperators() {
    return this.httpClient.get<any>(this.url + '/p/domains/types-operator')
  }
}
