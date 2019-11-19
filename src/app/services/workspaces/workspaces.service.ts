import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * getDepartments
   */
  public getDepartments() {
    return this.httpClient.get(this.url + '/workspaces/v1/departments');
  }
}
