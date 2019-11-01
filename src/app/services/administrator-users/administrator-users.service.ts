import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministratorUsersService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * RegisterUser
   */
  public RegisterUser(data: any) {
    return this.httpClient.post(this.url + '/vu/users', data);
  }
  /**
   * GetUsers
   */
  public GetUsers(pagina: string) {
    return this.httpClient.get<any>(this.url + '/vu/users?page=' + pagina, { observe: 'response' });
  }
  /**
   * UpdateUser
   */
  public UpdateUser(idUser: string, data: any) {
    return this.httpClient.put(this.url + '/vu/users/' + idUser, data);

  }
  /**
   * GetOnlyUser
   */
  public GetOnlyUser(idUser: string) {
    return this.httpClient.get<any>(this.url + '/vu/users/' + idUser);
  }
  /**
   * DisableUser
   */
  public DisableUser(idUser: string) {
    return this.httpClient.put<any>(this.url + '/vu/users/' + idUser+'/disable',{});
  }
    /**
   * EnableUser
   */
  public EnableUser(idUser: string) {
    return this.httpClient.put<any>(this.url + '/vu/users/' + idUser+'/enable',{});
  }
}
