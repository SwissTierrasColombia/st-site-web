import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmationPassword: ""
  }
  constructor(
    private service: LoginService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  register(){
    if (this.registerData.password === this.registerData.confirmationPassword) {
      this.service.registerUser(this.registerData).subscribe(
        data=>{
          //console.log(data);
          this.toastr.success("Se creado la cuenta exitosamente.");        
          this.route.navigate(['/autenticacion/login']);
        }
      ); 
    }else{
      this.toastr.show("las contraseñas no coinciden");
    }
  }
  
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.register();
    }
  }
  volver(){
    this.route.navigate(['/autenticacion/login']);
  }
}
