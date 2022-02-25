import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileIGAC, Proceso } from './models/igac-model.interface';


@Injectable({
  providedIn: 'root',
})
export class SinicIGACService {
  url: string;
  
  constructor(private _httpClient: HttpClient) {
    this.url = environment.apiIGACUrl;
  }
  

  public uploadFile(request: any, file: File):Observable<FileIGAC>{
    const formData: FormData = new FormData();
    formData.append('documento', file, file.name);
    
    
    formData.append('request',new Blob([JSON.stringify(request)], {
          type: "application/json"
    }));

    return this._httpClient.post<FileIGAC>(`${this.url}/entrega/documentos`, formData, 
    { responseType: 'json'});
  }

  public downloadFile(uuid: string):Observable<FileIGAC>{
    return this._httpClient.get<FileIGAC>(`${this.url}/entrega/documentos/${uuid}`);
  }

  public deleteFile(uuid: string):Observable<FileIGAC>{
    return this._httpClient.delete<FileIGAC>(`${this.url}/entrega/documentos/${uuid}`);
  }

  public procesar(request:any):Observable<string>{
    return this._httpClient.post<string>(`${this.url}/entrega/procesar`,request);
  }

  public obtenerDocumentosPorEntrega(deliveryId: number):Observable<Array<FileIGAC>>{
    return this._httpClient.get<Array<FileIGAC>>(`${this.url}/entrega/${deliveryId}/documentos`);
  }

  public obtenerProcesoPorEntrega(deliveryId: number):Observable<Proceso>{
    return this._httpClient.get<Proceso>(`${this.url}/entrega/${deliveryId}`);
  }


}
