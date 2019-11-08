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
   * postFileImagen
   */
  public postFileImagen(file: File) {
    const formData = new FormData();
    formData.append('filesXTF[]', file);
    return this.httpClient.post(this.url + '/ili/ilivalidator/validate', formData);
  }
  /**
   * generateDatabase
   */
  public generateDatabase(data: any) {
    return this.httpClient.post(this.url + '/ili/ili2pg/schema-import?databaseName='
      + data.databaseName + '&databasePassword=' + data.databasePassword + '&databasePort='
      + data.databasePort + '&databaseSchema=' + data.databaseSchema + '&databaseUsername='
      + data.databaseUsername + '&databaseHost=' + data.databaseHost, {});
  }
}
