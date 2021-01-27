import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    password: '',
  };
  emailByRecover: string;
  buttonRecover: boolean;
  codeRecover: string;
  newPassword: string;
  confirmationNewPassword: string;
  buttonReset: boolean;
  constructor(
    public router: Router,
    private serviceAUTH: LoginService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) {
    this.emailByRecover = '';
    this.buttonRecover = false;
    this.codeRecover = '';
    this.newPassword = '';
    this.confirmationNewPassword = '';
  }

  ngOnInit() {}

  onLoggedin() {
    this.serviceAUTH
      .login(this.loginData.username.toLowerCase(), this.loginData.password)
      .subscribe((data) => {
        localStorage.setItem(environment.nameTokenSession, data.access_token);
        this.router.navigate(['inicio']);
      });
  }
  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.onLoggedin();
    }
  }
  recoverPassword(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalRecover(modal: any) {
    if (this.buttonRecover) {
      this.serviceAUTH
        .recoverPassword(this.emailByRecover)
        .subscribe((response: any) => {
          console.log(response);
          this.toast.success(response.message);
          this.modalService.dismissAll();
          this.modalService.open(modal, { centered: true, scrollable: true });
        });
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validfield() {
    this.buttonRecover = false;
    if (this.validateEmail(this.emailByRecover)) {
      this.buttonRecover = true;
    }
  }
  validfield2() {
    this.buttonReset = false;
    if (
      this.codeRecover !== '' &&
      this.newPassword !== '' &&
      this.confirmationNewPassword !== ''
    ) {
      this.buttonReset = true;
    }
  }
  closeModalReset() {
    if (this.newPassword === this.confirmationNewPassword) {
      this.serviceAUTH
        .ResetPassword(this.emailByRecover, this.codeRecover, this.newPassword)
        .subscribe((response: any) => {
          console.log(response);
          this.toast.success(response.message);
          this.modalService.dismissAll();
        });
    } else {
      this.toast.error('Las contraseñas no son iguales.');
    }
  }
}
