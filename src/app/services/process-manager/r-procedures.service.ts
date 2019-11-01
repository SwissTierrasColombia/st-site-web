import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class RProceduresService {

    public url: string;

    constructor(private http: HttpClient) {
        this.url = environment.apiBaseUrlPrefix;
    }

    getDataStartProcedure(mProcessId: string) {
        return this.http.get(this.url + `/r/procedures/${mProcessId}/fields`, { observe: 'response' });
    }

    getDataContinueProcedure(rProcessId: string) {
        return this.http.get(this.url + `/r/procedures/${rProcessId}/fields-next`, { observe: 'response' });
    }

}
