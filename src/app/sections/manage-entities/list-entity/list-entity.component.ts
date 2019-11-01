import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.scss']
})
export class ListEntityComponent implements OnInit {
  entities: any;
  constructor(
    private serviceEntity: EntitiesService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.serviceEntity.GetEntities().subscribe(
      data => {
        this.entities = data;
      }
    )
  }
  createEntity() {
    this.route.navigate(['/entidades/nuevo']);
  }
  updateEntity(item: any) {
    this.route.navigate(['/entidades/actualizar/' + item._id + '/' + item.entity]);
  }

}
