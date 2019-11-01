import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix
  }
  /**
   * Get Roles
   */
  public GetRoles() {
    return this.httpClient.get<any>(this.url + '/vu/roles')
  }
  /**
   * CreateRole
   */
  public CreateRole(data: any) {
    return this.httpClient.post(this.url + '/vu/roles', data)
  }
  /**
   * Update Rol
   */
  public UpdateRole(idRol:string,data: any) {
    return this.httpClient.put(this.url + '/vu/roles/'+idRol, data) 
  }
    /**
   * Delete Rol
   */
  public DeleteRole(idRol:string) {
    return this.httpClient.delete(this.url + '/vu/roles/'+idRol) 
  }
}
