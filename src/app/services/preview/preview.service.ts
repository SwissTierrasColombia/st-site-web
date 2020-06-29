import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }


  public getFileExt(filename) {
    let ext: string = filename.split('.').pop();
    return ext.toLowerCase();
  }

  /**
   * getLayersList
   */
  getLayersList(files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      let ext = this.getFileExt(files.item(i).name);
      switch (ext) {
        case 'xtf':
          form.append('file[]', files.item(i), files.item(i).name + '');
          break;
        case 'ili':
          form.append('model_file[]', files.item(i), files.item(i).name + '');
          break;

      }
    }
    return this.httpClient.post(this.url + '/ili/xtf2json/v1/ili2json', form);
  }

  /**
   * getLayer
   */
  getLayer(id, key, type) {
    return this.httpClient.get(this.url + '/ili/xtf2json/v1/download/' + id + '/' + key + '/' + type);
  }

  /**
   * getLayersShp
   */
  getLayersShp(files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      let ext = this.getFileExt(files.item(i).name);
      switch (ext) {
        case 'shp': case 'cpg': case 'dbf': case 'prj': case 'sbn': case 'sbx': case 'shx': case 'xml':
          form.append('file[]', files.item(i), files.item(i).name + '');
          break;
      }
    }
    return this.httpClient.post(this.url + '/ili/xtf2json/v1/shp2json', form);
  }

  /**
   * getLayersShp
   */
  getLayersGpkg(files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      let ext = this.getFileExt(files.item(i).name);
      switch (ext) {
        case 'gpkg': 
          form.append('file[]', files.item(i), files.item(i).name + '');
          break;
      }
    }
    return this.httpClient.post(this.url + '/ili/xtf2json/v1/gpkg2json', form);
  }

  /**
   * getLayersKml
   */
  getLayersKml(files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      let ext = this.getFileExt(files.item(i).name);
      switch (ext) {
        case 'kml':
          form.append('file[]', files.item(i), files.item(i).name + '');
          break;
      }
    }
    return this.httpClient.post(this.url + '/ili/xtf2json/v1/kml2json', form);
  }


  /**
   * getLayersShp
   */
  getLayersSupply(file: string) {
    const form = new FormData();
    form.append('url', file);
    return this.httpClient.post(this.url + '/ili/xtf2json/v1/supply2json', form);
  }

}
