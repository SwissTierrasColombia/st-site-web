import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  numGroup: number = 0;
  arrayNumGroups = [];
  nameGroups = [];

  constructor() {}

  ngOnInit(): void {}

  changeNumberGroup() {
    this.arrayNumGroups = [];
    if (this.numGroup > 0) {
      for (let index = 0; index < this.numGroup; index++) {
        this.arrayNumGroups.push({});
      }
    }
  }
  deleteGroup(index: number) {
    this.arrayNumGroups.splice(index, 1);
    this.nameGroups.splice(index, 1);
    this.numGroup = this.arrayNumGroups.length;
    // console.log(this.numGroup);
    // console.log(this.arrayNumGroups);
    // console.log(this.nameGroups);
  }
  save() {}
  cancel() {
    this.numGroup = 0;
    this.arrayNumGroups = [];
    this.nameGroups = [];
  }
}
