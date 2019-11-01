import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { ToastrService } from 'ngx-toastr';
import { ObjectEspecialRegime } from 'src/app/models/object-especial-regime.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ObjectEspecialRegimeService {
  url: string = environment.urlRegistro
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  public GetDataModel(id: Number) {
    return this.httpClient.get<ModelsEspecialRegime>(this.url + "/ideat/models/" + id);
  }
  public GetRestrictions() {
    return this.httpClient.get<RestrictionsObjectEspecial>(this.url + "/vu/ore/restrictions");
  }
  public GetFeatures(url: string) {
    return this.httpClient.get<FeaturesObjectEspecial>(url)
  }
  public PostObjectRegister(data: any) {
    return this.httpClient.post(this.url + "/vu/ore", data)
  }
  public getObjetoRegister(id: number) {
    return this.httpClient.get<ObjectEspecialRegime>(this.url + "/vu/ore/" + id);
  }

  public updateObjectRegister(data: any) {
    return this.httpClient.put(this.url + "/vu/ore", data)
  }
  public deleteObject(id: number) {
    return this.httpClient.delete(this.url + "/vu/ore/" + id)
  }
}
