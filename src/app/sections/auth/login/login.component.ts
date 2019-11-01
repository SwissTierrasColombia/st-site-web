import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private service: LoginService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  dataLoginOld = [];
  loginData = {
    username: "",
    password: ""
  }
  ngOnInit(): void {
  }

  public login() {
    this.service.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        //console.log(this.dataLoginOld = JSON.parse(atob(response.body.token.split('.')[1])));
        sessionStorage.setItem(environment.nameTokenSession, response.body.token)
        this.route.navigate(['inicio']);
      }); //login nuevo
  }
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.login();
    }
  }
  recover(){
    this.route.navigate(['autenticacion/recuperar']);
  }
}
