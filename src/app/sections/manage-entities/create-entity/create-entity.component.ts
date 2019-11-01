import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements OnInit {
  nomEntityCreate:string;
  constructor(
    private route: Router,
    private toastr: ToastrService,
    private serviceEntity: EntitiesService,
  ) { 
    this.nomEntityCreate='';
  }

  ngOnInit() {
    
  }
  CreateRol(){
    if (this.nomEntityCreate!='') {
      let data ={
        'entity':this.nomEntityCreate
      }
      this.serviceEntity.CreateEntity(data).subscribe(
        _=>{
          this.toastr.success("Se ha creado la entidad: "+this.nomEntityCreate);
          this.nomEntityCreate=''
        }
      );
    }else {
      this.toastr.info("No has colocado ningun nombre de entidad")
    }

  }
  volver() {
    this.route.navigate(['entidades/']);
  }
}
