import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /**
   * getDepartments
   */
  public getDepartments() {
    return this.httpClient.get(this.url + '/workspaces/v1/departments');
  }
  /**
   * GetMunicipalitiesByDeparment
   */
  public GetMunicipalitiesByDeparment(idDepartament: string) {
    return this.httpClient.get(this.url + '/workspaces/v1/departments/' + idDepartament + '/municipalities');
  }
  /**
   * getWorkSpaceByMunicipality
   */
  public getWorkSpaceByMunicipality(idMunicipality: string) {
    return this.httpClient.get(this.url + '/workspaces/v1/workspaces/municipalities/' + idMunicipality);
  }
  /**
   * CreateWorkspace
   */
  public createWorkspace(data: any) {
    const form = new FormData();
    form.append('supportFile', data.supportFile);
    form.append('managerCode', data.managerCode);
    form.append('municipalityId', data.municipalityId);
    form.append('observations', data.observations);
    form.append('numberAlphanumericParcels', data.numberAlphanumericParcels);
    form.append('startDate', data.startDate);
    form.append('municipalityArea', data.municipalityArea);
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces', form);
  }
  /**
   * GetWorkSpace
   */
  public getWorkSpace(idWorkspace: number) {
    return this.httpClient.get(this.url + '/workspaces/v1/workspaces/' + idWorkspace);
  }
  /**
   * updateWorkSpace
   */
  public updateWorkSpace(idWorkspace: number, data: any) {
    return this.httpClient.put(this.url + '/workspaces/v1/workspaces/' + idWorkspace, data);
  }
  /**
   * getSupportsByWorkSpace
   */
  public getSupportsByWorkSpace(idWorkspace: number) {
    return this.httpClient.get(this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/supports');
  }
  /**
   * assingOperatorToWorkSpace
   */
  public assingOperatorToWorkSpace(idWorkspace: number, data: FormData) {
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/operators', data);
  }
  /**
   * getWorkSpaceActiveByMunicipality
   */
  public getWorkSpaceActiveByMunicipality(idMunicipality: number) {
    return this.httpClient.get(this.url + '/workspaces/v1/workspaces/municipalities/' + idMunicipality);
  }
  /**
   * createRequest
   */
  public createRequest(idMunicipality: number, data: any) {
    return this.httpClient.post(this.url + '/workspaces/v1/providers/municipalities/' + idMunicipality + '/requests', data);
  }
  /**
   * getPendingRequestByProvider
   */
  public getPendingRequestByProvider() {
    return this.httpClient.get(this.url + '/workspaces/v1/providers/pending-requests');
  }
  /**
   * loadSupplyFromRequest
   */
  public loadSupplyFromRequest(idInsumo: string, data: FormData) {
    return this.httpClient.put(this.url + '/workspaces/v1/providers/requests/' + idInsumo, data);
  }
  /**
   * closeRequest
   */
  public closeRequest(idInsumo: number) {
    return this.httpClient.put(this.url + '/workspaces/v1/providers/requests/' + idInsumo + '/close', {});
  }
  /**
   * createUser
   */
  public createUser(data: any) {
    return this.httpClient.post(this.url + '/workspaces/v1/administration/users', data);
  }
  /**
   * GetSuppliesByMunicipality
   */
  public GetSuppliesByMunicipalityXTF(idMunicipality: number) {
    return this.httpClient.get(this.url + '/workspaces/v1/supplies/' + idMunicipality + '?extensions=xtf');
  }
  /**
   * GetIntegrationCadastreRegistration
   */
  public GetIntegrationCadastreRegistration(idMunicipality: number, data: any) {
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces/integration/' + idMunicipality, data);
  }
  /**
   * GetIntegrationsByWorkspace
   */
  public GetIntegrationsByWorkspace(idWorkspace: number) {
    return this.httpClient.get(this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/integrations');
  }
  /**
   * StartIntegrationAssited
   */
  public StartIntegrationAssited(idWorkspace: number, idIntegration: number) {
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/integrations/' + idIntegration + '', {});
  }
  /**
   * GenerateProductFromIntegration
   */
  public GenerateProductFromIntegration(idWorkspace: number, idIntegration: number) {
    return this.httpClient.post(this.url + '/workspaces/v1/workspaces/' + idWorkspace + '/integrations/' + idIntegration + '/export', {});
  }
  /**
   * GetPendingTasksUser
   */
  public GetPendingTasksUser() {
    return this.httpClient.get(this.url + '/workspaces/v1/tasks/pending');
  }
}
