import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

    public url: string;

    constructor(private http: HttpClient) {
        this.url = environment.apiBaseUrlPrefix;
    }

    getTasksProcedures() {
        return this.http.get(this.url + `/vu/users/tasks`, { observe: 'response' });
    }

}
