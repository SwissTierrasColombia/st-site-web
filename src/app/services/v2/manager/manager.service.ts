import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * assignOperatorToMunicipality
   */
  public assignOperatorToMunicipality(workspaceId: number, formData: FormData) {
    return this.httpClient.post(
      this.url + '/workspaces/v1/workspaces/' + workspaceId + '/operators',
      formData
    );
  }
  /**
   * updateOperatorInformationFromWorkspace
   */
  public updateOperatorInformationFromWorkspace(
    workspaceId: number,
    operatorCode: number,
    formData: FormData
  ) {
    return this.httpClient.put(
      this.url +
        '/workspaces/v2/workspaces/' +
        workspaceId +
        '/operators/' +
        operatorCode,
      formData
    );
  }
  /**
   * downloadOperatorSupport
   */
  public downloadOperatorSupport(workspaceId: number, operatorCode: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v2/workspaces/' +
        workspaceId +
        '/download-support-operator/' +
        operatorCode,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
}
