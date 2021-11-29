import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CreateDeliveryInterface from './models/create-delivery.interface';
import IOptionsFindDeliveryInterface from './models/options-find-delivery.interface';
import UpdateDeliveryInterface from './models/update-delivery.interface';

@Injectable({
  providedIn: 'root',
})
export class SinicService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * findDeliveries
   */
  public findDeliveries(
    options: IOptionsFindDeliveryInterface
  ) {
    let url = `${this.url}/sinic/v1/deliveries?page=${options.page}&limit=${options.pageSize}`;
    if (options.selectStates !== '0') {
      url += `&states=${options.selectStates}`;
    }
    if (options.code !== '') {
      url += `&code=${options.code}`;
    }
    if (options.selectMunicipality !== '0') {
      url += `&municipality=${options.selectMunicipality}`;
    }
    if (options.selectManagerId !== 0) {
      url += `&manager=${options.selectManagerId}`;
    }
    return this.httpClient.get(url);
  }
  /**
   * searchDelivery
   */
  public searchDelivery(deliveryId: number) {
    return this.httpClient.get(`${this.url}/sinic/v1/deliveries/${deliveryId}`);
  }
  /**
   * createDelivery
   */
  public createDelivery(data: CreateDeliveryInterface) {
    return this.httpClient.post(`${this.url}/sinic/v1/deliveries`, data);
  }
  /**
   * removeDelivery
   */
  public removeDelivery(deliveryId: number) {
    return this.httpClient.delete(
      `${this.url}/sinic/v1/deliveries/${deliveryId}`
    );
  }
  /**
   * removeDelivery
   */
  public updateDelivery(deliveryId: number, data: UpdateDeliveryInterface) {
    return this.httpClient.put(
      `${this.url}/sinic/v1/deliveries/${deliveryId}`,
      data
    );
  }
}
