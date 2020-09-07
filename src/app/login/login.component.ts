import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    this.serviceAUTH.login(this.loginData.username.toLowerCase(), this.loginData.password).subscribe(
      data => {
        console.log(data.access_token);
        
        localStorage.setItem(environment.nameTokenSession, data.access_token);
        this.router.navigate(['inicio']);
      }
    );
  }
  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.onLoggedin();
    }
  }
}
