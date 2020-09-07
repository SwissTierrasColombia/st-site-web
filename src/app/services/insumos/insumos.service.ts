import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * GetAttachmentsTypes
   */
  public GetAttachmentsTypes() {
    return this.httpClient.get(this.url + '/supplies/v1/attachments-types');
  }
}
