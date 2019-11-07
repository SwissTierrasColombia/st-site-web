import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-cargue',
  templateUrl: './cargue.component.html',
  styleUrls: ['./cargue.component.scss'],
  animations: [routerTransition()]
})
export class CargueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
