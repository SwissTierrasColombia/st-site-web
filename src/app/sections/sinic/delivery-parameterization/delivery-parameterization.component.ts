import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';
import { SinicPeriodService } from 'src/app/sections/sinic/sinic-period.service';
import { forkJoin } from 'rxjs';
import * as _moment from 'moment';
const moment = _moment;
moment.locale('es');

interface PeriodFormat {
  periodNumber: number;
  startDate: string;
  finishDate: string;
  groupsSelected: Array<string>;
  selectAllGroups: boolean;
}

@Component({
  selector: 'app-delivery-parameterization',
  templateUrl: './delivery-parameterization.component.html',
  styleUrls: ['./delivery-parameterization.component.scss'],
})
export class DeliveryParameterizationComponent implements OnInit {

  cycleId: string;
  year: number;
  numPeriods: number;
  arrayNumGroups: Array<PeriodFormat>;
  groups: Array<any>;
  formOk: boolean;

  nameGroups = [];
  public options: Options;
  public listGroupsData: Array<Select2OptionData>[];
  selectAllGroups: boolean = false;
  dateStartGroup = [];
  dateEndGroup = [];

  constructor(
    private route: ActivatedRoute,
    private sinicService: SinicPeriodService,
    private toast: ToastrService,
  ) {

    this.cycleId = null;
    this.numPeriods = 0;
    this.year = 2022;
    this.arrayNumGroups = [];
    this.groups = [];
    this.formOk = false;

    this.listGroupsData = [];

    this.options = {
      multiple: true,
      tags: false,
      width: '450',
    };
  }

  ngOnInit(): void {
    const cycleId = this.route.snapshot.paramMap.get('cycleId');
    this.cycleId = cycleId;
    this.setupInformation(cycleId);
    console.log('FORMAT--->', moment('2022-07-04').valueOf());
  }

  selectAllGroupsForPeriod(period: PeriodFormat) {
    const index = period.periodNumber - 1;
    period.selectAllGroups = !period.selectAllGroups;
    if (period.selectAllGroups) {
      period.groupsSelected = [];
      this.listGroupsData[index].forEach((element) => {
        period.groupsSelected.push(element.id);
      });
    } else {
      period.groupsSelected = [];
    }
  }

  getGroup(index1: number, groupId: string) {
    const group = this.listGroupsData[index1].find(
      (element) => element.id == groupId
    );
    return group.text;
  }

  setupInformation(cycleId: string) {
    forkJoin([this.sinicService.findCycleById(cycleId),
    this.sinicService.findPeriodsByCycle(cycleId),
    this.sinicService.findGroups()]).subscribe(results => {

      const cycle: any = results[0];
      const periods: any = results[1];
      const groupsData: any = results[2];

      this.groups = this.formatGroups(groupsData);

      this.year = cycle.year;
      this.numPeriods = cycle.amountPeriods;

      if (periods.length > 0) {

        this.formOk = true;

        this.arrayNumGroups = [];

        for (let i = 0; i < periods.length; i++) {
          const period = periods[i];

          this.setupGroupsData(i, this.groups);

          const startDate = this.formatDate(period.startDate);
          const finishDate = this.formatDate(period.finishDate);

          this.arrayNumGroups.push({
            periodNumber: i + 1,
            startDate,
            finishDate,
            groupsSelected: period.groups.map((g: any) => g.groupId),
            selectAllGroups: false,
          });


          this.dateStartGroup.push([]);
          this.dateEndGroup.push([]);
          for (const key in period.groups) {
            const periodGroup = period.groups[key];
            this.dateStartGroup[i][periodGroup.groupId] = this.formatDate(periodGroup.startDate);
            this.dateEndGroup[i][periodGroup.groupId] = this.formatDate(periodGroup.finishDate);
          }

        }

      } else {

        for (let i = 0; i < cycle.amountPeriods; i++) {

          this.setupGroupsData(i, this.groups);

          this.arrayNumGroups.push({
            periodNumber: i + 1,
            startDate: '',
            finishDate: '',
            groupsSelected: [],
            selectAllGroups: false,
          });

          this.dateStartGroup.push([]);
          this.dateEndGroup.push([]);

        }

      }

    });
  }

  formatGroups(groupsData: any) {
    return groupsData.map((g: any) => {
      return { id: g.id, text: g.name };
    });
  }

  getGroupName(groupId: string) {
    const group = this.groups.find(
      (element) => element.id == groupId
    );

    return group ? group.text : '';
  }

  setupGroupsData(index: number, defaultGroups: any) {
    this.listGroupsData[index] = defaultGroups;
  }

  formatDate(date: number) {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }

  verifyForm(event?: string) {
    this.formOk = false;
    for (const key in this.arrayNumGroups) {
      const period = this.arrayNumGroups[key];

      if (!(period.startDate !== '' && period.finishDate !== '' && period.groupsSelected.length > 0
        && this.verifyGroupsByPeriod(period.periodNumber, period.groupsSelected))) {
        this.formOk = false;
        return;
      }
    }
    this.formOk = true;
  }

  verifyGroupsByPeriod(periodNumber: number, groupsSelected: Array<string>) {
    for (const key in groupsSelected) {
      const groupSelected = groupsSelected[key];
      if (this.dateStartGroup[periodNumber - 1][groupSelected] === undefined
        || this.dateStartGroup[periodNumber - 1][groupSelected] === ''
        || this.dateEndGroup[periodNumber - 1][groupSelected] === undefined
        || this.dateStartGroup[periodNumber - 1][groupSelected] === '') {
        return false;
      }
    }
    return true;
  }

  save() {

    for (const key in this.arrayNumGroups) {
      const period = this.arrayNumGroups[key];
      if (!(period.startDate !== '' && period.finishDate !== '' && period.groupsSelected.length > 0
        && this.verifyGroupsByPeriod(period.periodNumber, period.groupsSelected))) {
        this.toast.error('Recuerde que los campos marcados con * son obligatorios');
        return;
      }
    }

    for (const key in this.arrayNumGroups) {
      const period = this.arrayNumGroups[key];

      const periodStart = period.startDate;
      const periodEnd = period.finishDate;

      console.log('periodStart', periodStart)

      if (this.isDateStartAfterDateEnd(periodStart, periodEnd)) {
        this.toast.error(`La fecha de inicio del periodo # ${period.periodNumber} debe ser menor a la fecha final`);
        return;
      }

      for (const index in period.groupsSelected) {
        const groupSelected = period.groupsSelected[index];

        const groupStart = this.dateStartGroup[period.periodNumber - 1][groupSelected];
        const groupEnd = this.dateEndGroup[period.periodNumber - 1][groupSelected];

        if (this.isDateStartAfterDateEnd(groupStart, groupEnd)) {
          this.toast.error(`La fecha de inicio del grupo ${this.getGroupName(groupSelected)} en el periodo # ${period.periodNumber} debe ser menor a la fecha final`);
          return;
        }

      }

    }

    const periodsData = [];
    for (const key in this.arrayNumGroups) {
      const period = this.arrayNumGroups[key];

      const groups = [];
      for (const index in period.groupsSelected) {
        const groupSelected = period.groupsSelected[index];
        const groupStart = this.dateStartGroup[period.periodNumber - 1][groupSelected];
        const groupEnd = this.dateEndGroup[period.periodNumber - 1][groupSelected];
        groups.push({
          groupId: groupSelected,
          startDate: moment(groupStart).valueOf(),
          finishDate: moment(groupEnd).valueOf(),
        });
      }

      periodsData.push({
        startDate: moment(period.startDate).valueOf(),
        finishDate: moment(period.finishDate).valueOf(),
        groups: groups
      });

    }

    console.log('NICE --->', periodsData);

    this.sinicService.createCycleConfiguration(this.cycleId, { periods: periodsData }).subscribe((data: any) => {
      this.toast.success('Se ha actualizado la configuración correctamente.');
      this.formOk = false;
      this.setupInformation(this.cycleId);
    });

  }

  cancel() {
    this.setupInformation(this.cycleId);
  }

  isDateStartAfterDateEnd(start: string, end: string) {
    return moment(start).isSameOrAfter(end);
  }

}
