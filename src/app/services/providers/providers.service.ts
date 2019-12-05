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
}
