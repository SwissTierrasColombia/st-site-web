import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-update-entity',
  templateUrl: './update-entity.component.html',
  styleUrls: ['./update-entity.component.scss']
})
export class UpdateEntityComponent implements OnInit {
  idEntity: string;
  nomEntity: string;
  nomBeforeEntity:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private serviceEntity: EntitiesService,
  ) { 
  }

  ngOnInit() {
    let promise1 = new Promise((resolve) => {
      this.route.params.subscribe(
        (response: any) => {
          this.idEntity = response.idEntity;
          this.nomEntity = response.entityName;
          resolve(response);
        }
      );
    });
    Promise.all([promise1]).then(values => {
      this.nomBeforeEntity=this.nomEntity;
      
    })
  }
  UpdateEntity(){
    if (this.nomEntity!='') {
      let data ={
        'name':this.nomEntity
      }
      this.serviceEntity.UpdateEntity(this.idEntity,data).subscribe(
        _=>{
          this.toastr.success("Se a actualizado la entidad: "+this.nomEntity);
          this.nomEntity=''
        }
      );
    }else {
      this.toastr.info("No has colocado ningun nombre")
    }
  }
  volver() {
    this.router.navigate(['entidades/']);
  }

}
