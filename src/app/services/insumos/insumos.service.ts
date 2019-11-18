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
    return this.httpClient.post(this.url + '/ili/ilivalidator/v1/validate', formData);
  }
  /**
   * generateDatabase
   */
  public generateSchemaDatabase(data: any) {
    return this.httpClient.post(this.url + '/ili/ili2pg/v1/schema-import', data);
  }
  public generateImportDatabase(formXTF: File, data: any) {
    const form = new FormData();
    form.append('fileXTF', formXTF);
    form.append('databaseHost', data.databaseHost);
    form.append('databasePort', data.databasePort);
    form.append('databaseSchema', data.databaseSchema);
    form.append('databaseUsername', data.databaseUsername);
    form.append('databasePassword', data.databasePassword);
    form.append('databaseName', data.databaseName);
    return this.httpClient.post(this.url + '/ili/ili2pg/v1/import', form);
  }
  /**
   * saveFileRepositoryDoc
   */
  public saveFileRepositoryDoc(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('driver', 'Local');
    return this.httpClient.post(this.url + '/filemanager/v1/file', formData);
  }
}
