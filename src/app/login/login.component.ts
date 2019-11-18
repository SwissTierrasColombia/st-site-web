import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/auth/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginData = {
        username: '',
        password: ''
    };

    constructor(
        public router: Router,
        private serviceAUTH: LoginService
    ) { }

    ngOnInit() { }

    onLoggedin() {
        console.log('loginData: ', this.loginData);
        this.serviceAUTH.login(this.loginData.username, this.loginData.password).subscribe(
            data => {
                console.log('hice login', data);
                localStorage.setItem(environment.nameTokenSession, data.access_token);
                this.router.navigate(['inicio']);
            }
        );
    }
}
