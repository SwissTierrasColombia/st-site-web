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
  /**
   * getAllOperators
   */
  public getAllOperators() {
    return this.httpClient.get(this.url + '/operators/v1/operators');
  }
  /**
   * createOperator
   */
  public createOperator(data: any) {
    return this.httpClient.post(this.url + '/operators/v1/operators', data);
  }
  /**
 * updateOperator
 */
  public updateOperator(data: any) {
    return this.httpClient.put(this.url + '/operators/v1/operators', data);
  }
  /**
   * disableOperator
   */
  public disableOperator(id: number) {
    return this.httpClient.put(this.url + '/operators/v1/operators/' + id + '/disable', {});
  }
  /**
   * enableOperator
   */
  public enableOperator(id: number) {
    return this.httpClient.put(this.url + '/operators/v1/operators/' + id + '/enable', {});
  }
}
