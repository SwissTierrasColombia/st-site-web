import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})

export class QueryService {
    inputNupre: string;
    apiURL: string = environment.url;
    constructor(private httpClient: HttpClient) {
    }

    public getAdministrativeQuery(tid: number) {
        return this.httpClient.get<any>(`${this.apiURL}/private/parcel/affectations?id=${tid}`);
    }


}
