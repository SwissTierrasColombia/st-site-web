import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * getOperatorsByFilters
   */
  public getOperatorsByFilters() {
    return this.httpClient.get(this.url + '/operators/v1/operators?state=1');
  }

  /**
   * getOperatorById
   */
  public getOperatorById(idOperator: string) {
    return this.httpClient.get(this.url + '/operators/v1/operators/' + idOperator);
  }

}
