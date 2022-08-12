import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SinicPeriodService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrlPrefix;
  }

  public findGroups() {
    let url = `${this.url}/sinic/v1/groups`;
    return this.httpClient.get(url);
  }

  public createGroup(data: any) {
    return this.httpClient.post(this.url + '/sinic/v1/groups', data);
  }

  public updateGroup(cycleId: string, data: any) {
    return this.httpClient.put(this.url + `/sinic/v1/groups/${cycleId}`, data);
  }

  public createCycle(data: any) {
    return this.httpClient.post(this.url + '/sinic/v1/cycles', data);
  }

  public findCycles() {
    return this.httpClient.get(this.url + '/sinic/v1/cycles');
  }

  public findCycleById(cycleId: string) {
    return this.httpClient.get(this.url + `/sinic/v1/cycles/${cycleId}`);
  }

  public findPeriodsByCycle(cycleId: string) {
    return this.httpClient.get(this.url + `/sinic/v1/cycles/${cycleId}/periods`);
  }

  public createCycleConfiguration(cycleId: string, data: any) {
    return this.httpClient.post(this.url + `/sinic/v1/cycles/${cycleId}/periods`, data);
  }

  public updateCycle(cycleId: string, data: any) {
    return this.httpClient.put(this.url + `/sinic/v1/cycles/${cycleId}`, data);
  }

  public deleteCycle(cycleId: string) {
    return this.httpClient.delete(this.url + `/sinic/v1/cycles/${cycleId}`);
  }

}
