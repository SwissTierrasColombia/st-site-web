import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AdministratorUsersService } from 'src/app/services/administrator-users/administrator-users.service';
import { RolesService } from 'src/app/services/vu/roles.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsersComponent implements OnInit {

  asyncListUser: Observable<any[]>;
  totalUsers: number;
  page: number;
  limit: number;
  constructor(
    private service: AdministratorUsersService,
    private serviceRoles: RolesService,
    private serviceEntities: EntitiesService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.page = 1;
    this.limit = 10;
  }

  ngOnInit() {
    this.getPage(1);
  }
  getPage(page: number) {
    //console.log("page: ", page);

    this.asyncListUser = this.service.GetUsers(page.toString()).pipe(
      tap(res => {
        //console.log("res: ", res);
        this.totalUsers = res.body.total;
        this.page = page;
      }),
      map(res => {
        //console.log("Map res: ", res);
        return res.body.docs;
      })
    )
  }
  createUser() {
    this.route.navigate(['/usuarios/nuevo']);
  }
  updateUser(item: any) {
    this.route.navigate(['/usuarios/actualizar/' + item._id + '/' + item.username]);
  }
  changeStete(idUser:string, state:boolean){
    if (state) {
      this.service.DisableUser(idUser).subscribe(
        _=>{
          this,this.toastr.info("Se a desabilidato el usuario")
        }
      );
    }else{
      this.service.EnableUser(idUser).subscribe(
        _=>{
          this,this.toastr.success("Se a habilitado el usuario")
        }
      );
    }
  }
}
