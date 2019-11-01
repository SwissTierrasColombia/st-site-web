import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentsService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix
  }

  /**
   * Get Departaments
   */
  public GetDepartaments() {
    return this.httpClient.get<any>(this.url+'/vu/departments');
  }
  /**
   * Get municipalities by deparment
   */
  public GetMunicipalitiesByDeparment(idDepartament:string) {
    return this.httpClient.get<any>(this.url+'/vu/departments/'+idDepartament+'/municipalities')
  }
}
