import { Component, OnInit } from '@angular/core';
import { AdministratorUsersService } from 'src/app/services/administrator-users/administrator-users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/services/vu/roles.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  registerData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmationPassword: "",
    roles: [],
    entities: []
  }
  roles: any;
  entities: any;
  constructor(
    private service: AdministratorUsersService,
    private serviceRoles: RolesService,
    private serviceEntities: EntitiesService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.serviceRoles.GetRoles().subscribe(
      data=>{
        this.roles=data;
        //console.log(this.roles);
      }
    );
    this.serviceEntities.GetEntities().subscribe(
      data=>{
        this.entities=data;
        console.log(this.entities);
        
      }
    )
  }
  register(){
    if (this.registerData.password === this.registerData.confirmationPassword) {
      this.service.RegisterUser(this.registerData).subscribe(
        data=>{
          //console.log(data);
          this.toastr.success("Se creado la cuenta exitosamente.");        
          this.route.navigate(['/usuarios']);
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
  volver() {
    this.route.navigate(['usuarios/']);
  }
}
