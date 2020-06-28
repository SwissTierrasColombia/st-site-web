import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * getProviders
   */
  public getProviders() {
    return this.httpClient.get(this.url + '/providers-supplies/v1/providers');
  }
  /**
   * getTypeSuppliesByProvider
   */
  public getTypeSuppliesByProvider(idProvider: string) {
    return this.httpClient.get(this.url + '/providers-supplies/v1/providers/' + idProvider + '/types-supplies');
  }
  /**
   * getProfilesByProvider
   */
  public getProfilesByProvider(id: number) {
    return this.httpClient.get(this.url + '/providers-supplies/v1/providers/' + id + '/profiles');
  }
  /**
   * getCategoriesProviders
   */
  public getCategoriesProviders() {
    return this.httpClient.get(this.url + '/providers-supplies/v1/categories');
  }
  public createProvider(data: any) {
    return this.httpClient.post(this.url + '/providers-supplies/v1/providers', data);
  }
  /**
   * updateProviders
   */
  public updateProvider(data: any) {
    return this.httpClient.put(this.url + '/providers-supplies/v1/providers', data);
  }
  /**
   * deleteProvider
   */
  public deleteProvider(providerId: number) {
    return this.httpClient.delete(this.url + '/providers-supplies/v1/providers/' + providerId);
  }

}
