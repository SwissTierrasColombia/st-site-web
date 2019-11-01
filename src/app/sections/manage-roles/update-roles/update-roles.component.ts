import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../services/vu/roles.service';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.scss']
})
export class UpdateRolesComponent implements OnInit {
  idRol: string;
  nomRol: string;
  nomBeforeRol:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private serviceRoles: RolesService
  ) { 
  }

  ngOnInit() {
    let promise1 = new Promise((resolve) => {
      this.route.params.subscribe(
        (response: any) => {
          this.idRol = response.idRol;
          this.nomRol = response.roleName;
          resolve(response);
        }
      );
    });
    Promise.all([promise1]).then(values => {
      this.nomBeforeRol=this.nomRol;
      
    })
  }
  UpdateRol(){
    if (this.nomRol!='') {
      let data ={
        'name':this.nomRol
      }
      this.serviceRoles.UpdateRole(this.idRol,data).subscribe(
        _=>{
          this.toastr.success("Se a actualizado el rol: "+this.nomRol);
          this.nomRol=''
        }
      );
    }else {
      this.toastr.info("No has colocado ningun nombre de rol")
    }
  }
  volver() {
    this.router.navigate(['roles/']);
  }

}
