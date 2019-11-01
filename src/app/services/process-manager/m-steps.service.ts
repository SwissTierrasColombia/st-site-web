import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MStepsService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }
  /**
   * Add Field To Step
   */
  public AddFieldToStep(idstep: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.post(this.url + '/m/steps/' + idstep + '/fields', data);
  }

  /**
   * Get Fields From Step
   */
  public GetFieldsFromStep(idstep: string) {
    return this.httpClient.get<any>(this.url + '/m/steps/' + idstep + '/fields');
  }
  /**
   * Update Field From Step
   */
  public UpdateFieldFromStep(idStep: string, idField: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.put(this.url + '/m/steps/' + idStep + '/fields/' + idField, data);
  }
  /**
   * Remove Field From Step
   */
  public RemoveFieldFromStep(idStep: string, idField: string) {
    return this.httpClient.delete(this.url + '/m/steps/' + idStep + '/fields/' + idField);
  }
  /**
   * Add Rule To Step
   */
  public AddRuleToStep(idStep: string, data: any) {
    return this.httpClient.post(this.url + '/m/steps/' + idStep + '/rules', data);
  }
  /**
   * UpdateRuleToStep
   */
  public UpdateRuleToStep(idStep: string, idRule: string, data: any) {
    return this.httpClient.put(this.url + '/m/steps/' + idStep + '/rules/'+idRule, data);
  }
  /**
   * Remove rule to step
   */
  public RemoveRuleToStep(idStep: string, idRule: string) {
    return this.httpClient.delete(this.url + '/m/steps/' + idStep + '/rules/' + idRule);
  }
  /**
   * Add Role To Step
   */
  public AddRoleToStep(idStep: string, data: any) {
    return this.httpClient.post(this.url + '/m/steps/' + idStep + '/roles', data);
  }
  /**
   * Remove Role To Step
   */
  public RemoveRoleToStep(idStep: string, idRol: string) {
    return this.httpClient.delete(this.url + '/m/steps/' + idStep + '/roles/' + idRol);
  }
  /**
   * Set Origin Step
   */
  public SetOriginStep(idStep: string) {
    return this.httpClient.put(this.url + '/m/steps/' + idStep + '/origin', {});
  }
  /**
   * SetEntityToStep
   */
  public SetEntityToStep(idStep: string, idEntity: string) {
    return this.httpClient.put(this.url + '/m/steps/' + idStep + '/entities/' + idEntity, {});
  }

  public getDataOrderStep(mStepId: string) {
    return this.httpClient.get(this.url + '/m/steps/' + mStepId + '/order', { observe: 'response' });
  }

}
