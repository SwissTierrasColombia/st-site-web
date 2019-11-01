import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MProcessesService {

  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  /*
  * CreateProcess
  */
  public CreateProcess(data: any) {
    return this.httpClient.post(this.url + '/m/processes', data);
  }

  /*
  * GetProcesos
  */
  public GetProcesos() {
    return this.httpClient.get<any>(this.url + '/m/processes');
  }

  /**
   * Update a Process
   */
  public UpdateaProcess(ipProcess: string, data: any) {
    return this.httpClient.put(this.url + '/m/processes/' + ipProcess, data);
  }

  /*
   * Remove a Process
   */
  public RemoveaProcess(idProcess: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idProcess);
  }

  /*
  * Add role to process
  */
  public AddRolProcess(idProcess: string, rol: string) {
    return this.httpClient.post(this.url + '/m/processes/' + idProcess + '/roles', { role: rol });
  }

  /*
  * GetRolesProcess
  */
  public GetRolesProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/m/processes/' + id + '/roles');
  }

  /*
  * Update role to process
  */
  public UpdateRolProcess(idProcess: string, idRol: string, nombrerol: string) {
    return this.httpClient.put(this.url + '/m/processes/' + idProcess + '/roles/' + idRol, { name: nombrerol });
  }

  /*
   * Remove Role From Process
   */
  public RemoveRoleFromProcess(idprocess: string, idrule: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idprocess + '/roles/' + idrule);
  }

  /*
   * Add step to process
   */
  public AddStepProcess(idProcess: string, steps: string) {
    return this.httpClient.post(this.url + '/m/processes/' + idProcess + '/steps', { step: steps });
  }

  /*
   * Get steps from process
   */
  public GetStepsProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/m/processes/' + id + '/steps');
  }

  /*
   * Remove Step To Process
   */
  public RemoveStepToProcess(idProcess: string, stepsSelect: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idProcess + '/steps/' + stepsSelect);
  }

  /*
   * Add variable to process
   */
  public AddVariableToProcess(idProcess: string, data: any) {
    return this.httpClient.post(this.url + '/m/processes/' + idProcess + '/variables', data);
  }

  /*
   * Get Variables From Process
   */
  public GetVariablesFromProcess(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/m/processes/' + idProcess + '/variables');
  }

  /*
   * Update Variables From Process
   */
  public UpdateVariablesFromProcess(idProcess: string, idVariable: string, data: any) {
    return this.httpClient.put(this.url + '/m/processes/' + idProcess + '/variables/' + idVariable, data);
  }

  /*
   * Remove Variable From Process
   */
  public RemoveVariableFromProcess(idProcess: string, idVariable: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idProcess + '/variables/' + idVariable);
  }

  /*
   * Add Users To Process
   */
  public AddUsersToProcess(idProcess: string, data: any) {
    return this.httpClient.post(this.url + '/m/processes/' + idProcess + '/users', data);
  }

  /*
   * Get Users To Process
   */
  public GetUsersToProcess(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/m/processes/' + idProcess + '/users');
  }

  /*
   * Update User To Process
   */
  public UpdateUserToProcess(idProcess: string, idUser: string, data: any) {
    return this.httpClient.put(this.url + '/m/processes/' + idProcess + '/users/' + idUser, data);
  }

  /*
   * Remove User From Process
   */
  public RemoveUserFromProcess(idProcess: string, idUser: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idProcess + '/users/' + idUser);
  }

  /*
   * Deploy Process
   */
  public DeployProcess(idProcess: string) {
    return this.httpClient.put(this.url + '/m/processes/' + idProcess + '/deploy', {});
  }

  /*
   * Get Steps Flow
   */
  public GetStepsFlow(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/m/processes/' + idProcess + '/flow');
  }

  /*
  * get processes available
  */
  public getProcessesAvailable() {
    return this.httpClient.get(this.url + '/m/processes?available=true', { observe: 'response' });
  }
  /**
   * AddEntityToProcess
   */
  public addEntityToProcess(idProcess: string, data: any) {
    return this.httpClient.post(this.url + '/m/processes/' + idProcess + '/entities', data);
  }
  /**
   * RemoveEntityToProcess
   */
  public removeEntityToProcess(idProcess: string, idEntity: string) {
    return this.httpClient.delete(this.url + '/m/processes/' + idProcess + '/entities/' + idEntity);
  }

  /*
   * Undeploy Process
   */
  public UndeployProcess(idProcess: string) {
    return this.httpClient.put(this.url + '/m/processes/' + idProcess + '/undeploy', {});
  }

}
