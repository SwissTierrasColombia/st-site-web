import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix
  }
  /**
   * Get Entities
   */
  public GetEntities() {
    return this.httpClient.get<any>(this.url + '/vu/entities')
  }
    /**
   * CreateEntity
   */
  public CreateEntity(data: any) {
    return this.httpClient.post(this.url + '/vu/entities', data)
  }
  /**
   * Update Entity
   */
  public UpdateEntity(idEntity:string,data: any) {
    return this.httpClient.put(this.url + '/vu/entities/'+idEntity, data) 
  }
    /**
   * Delete Entity
   */
  public DeleteEntity(idEntity:string) {
    return this.httpClient.delete(this.url + '/vu/entities/'+idEntity) 
  }

}
