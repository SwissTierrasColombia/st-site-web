import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/services/vu/roles.service';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  nomRolCreate:string;
  constructor(
    private route: Router,
    private toastr: ToastrService,
    private serviceRoles: RolesService,
  ) { 
    this.nomRolCreate='';
  }

  ngOnInit() {
    
  }
  CreateRol(){
    if (this.nomRolCreate!='') {
      let data ={
        'role':this.nomRolCreate
      }
      this.serviceRoles.CreateRole(data).subscribe(
        _=>{
          this.toastr.success("Se a creado el rol: "+this.nomRolCreate);
          this.nomRolCreate=''
        }
      );
    }else {
      this.toastr.info("No has colocado ningun nombre de rol")
    }

  }
  volver() {
    this.route.navigate(['roles/']);
  }
}
