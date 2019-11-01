import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  email: EmailValidator;
  codeRecover: string;
  newPassword: string;
  confirmationPassword:string;
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  constructor(
    private route: Router,
    private service: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  changePassword() {
    if (this.newPassword === this.confirmationPassword) {
      let data={
        'email':this.email,
        'token':this.codeRecover,
        'password':this.newPassword
      }
      this.service.updatePassword(data).subscribe(
        _=>{
          this.toastr.success("Se ha actualizado la contraseña");
        this.route.navigate(['/autenticacion/login']);
        }
      )
    }else {
      this.toastr.show('Las contraseñas no coinciden')
    }

  }
  recover() {
    let data={
      'email':this.email
    }
    this.service.restorePassword(data).subscribe(
      _=>{
        this.toastr.success("Se ha enviado el codigó de recuperación de contraseña a tu correo")        
      }
    )
  }
  volver() {
    this.route.navigate(['/autenticacion/login']);
  }

}
