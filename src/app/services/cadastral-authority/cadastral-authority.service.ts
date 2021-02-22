import { UpdateInformationByWorkspace } from './../../models/updateInformationByWorkspace.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastralAuthorityService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * Get municipalities where manager does not belong in
   */
  public getMunicipalities(managerCode: number, departmentId: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v2/municipalities/' +
        managerCode +
        '/not-belong/departments/' +
        departmentId
    );
  }
  /**
   * unassignManagerFromMunicipality
   */
  public unassignManagerFromMunicipality(
    municipalityId: number,
    managerCode: number
  ) {
    return this.httpClient.delete(
      this.url +
        '/workspaces/v1/workspaces/unassign/' +
        municipalityId +
        '/managers/' +
        managerCode
    );
  }
  /**
   * validateMunicipalities
   */
  public validateMunicipalities(municipalities: string) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v2/workspaces/validate-municipalities-to-assign?municipalities=' +
        municipalities
    );
  }
  /**
   * assignManager
   */
  public assignManager(data: FormData) {
    return this.httpClient.post(
      this.url + '/workspaces/v2/workspaces/assign-manager',
      data
    );
  }
  /**
   * downloadSupportFromManager
   */
  public downloadSupportFromManager(workspaceId: number, managerCode: number) {
    return this.httpClient.get(
      this.url +
        '/workspaces/v2/workspaces/' +
        workspaceId +
        '/download-support-manager/' +
        managerCode,
      { responseType: 'arraybuffer', observe: 'response' }
    );
  }
  /**
   * updateManagerInformationFromWorkspace
   */
  public updateManagerInformationFromWorkspace(
    workspaceId: number,
    managerCode: number,
    data: UpdateInformationByWorkspace
  ) {
    return this.httpClient.put(
      this.url +
        '/workspaces/v2/workspaces/' +
        workspaceId +
        '/managers/' +
        managerCode,
      data
    );
  }
}
