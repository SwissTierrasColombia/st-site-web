import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class RProcessesService {

    public url: string;

    constructor(private http: HttpClient) {
        this.url = environment.apiBaseUrlPrefix;
    }

    saveInformationStep(data: FormData) {
        return this.http.post(this.url + '/r/processes', data, { observe: 'response' });
    }

    getProcess(rProcessId: string) {
        return this.http.get(this.url + '/r/processes/' + rProcessId, { observe: 'response' });
    }

    downloadFile(rProcessId: string, mStepId: string, fieldName: string) {
        return this.http.get(`${this.url}/r/processes/${rProcessId}/download?step=${mStepId}&field=${fieldName}`,
            { responseType: 'arraybuffer', observe: 'response' });
    }

}
