import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-delivery-parameterization',
  templateUrl: './delivery-parameterization.component.html',
  styleUrls: ['./delivery-parameterization.component.scss'],
})
export class DeliveryParameterizationComponent implements OnInit {
  year = 2022;
  numPeriods = 2;
  namePeriod = 'nombre periodo';
  arrayNumGroups = [];
  nameGroups = [];
  public options: Options;
  public listGroupsData: Array<Select2OptionData>[];
  selectGroups = [['0'], ['0']];
  selectAllGroups: boolean = false;
  dateStart: Date[];
  dateEnd: Date[];
  constructor() {
    this.listGroupsData = [
      [
        {
          id: '1',
          text: 'grupo 1',
        },
        {
          id: '2',
          text: 'grupo 2',
        },
        {
          id: '3',
          text: 'grupo 3',
        },
      ],
      [
        {
          id: '1',
          text: 'grupo 1',
        },
      ],
    ];
    this.options = {
      multiple: true,
      tags: false,
      width: '450',
    };
  }

  ngOnInit(): void {
    this.arrayNumGroups.push({});
    this.arrayNumGroups.push({});
  }
  changeData() {
    console.log(this.selectGroups);
  }
  clickCheckBox(index: number) {
    this.selectAllGroups = !this.selectAllGroups;
    if (this.selectAllGroups) {
      this.selectGroups[index] = [];
      this.listGroupsData[index].forEach((element) => {
        this.selectGroups[index].push(element.id);
      });
    } else {
      this.selectGroups[index] = ['0'];
    }
  }
  getGroup(index1: number, groupId: string) {
    const group = this.listGroupsData[index1].find(
      (element) => element.id == groupId
    );
    return group.text;
  }
  save() {}
  cancel() {}
}
