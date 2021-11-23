import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CreateDeliveryInterface from './models/create-delivery.interface';
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
    page: number,
    limit: number,
    states?: string,
    code?: number,
    municipality?: string,
    manager?: number
  ) {
    let url = `${this.url}/sinic/v1/deliveries?page=${page}&limit=${limit}`;
    if (states) {
      url += `&states=${states}`;
    } else if (code) {
      url += `&code=${code}`;
    } else if (municipality) {
      url += `&municipality=${municipality}`;
    } else if (manager) {
      url += `&manager=${manager}`;
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
