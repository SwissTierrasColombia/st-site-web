import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SinicPeriodService } from 'src/app/sections/sinic/sinic-period.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-periods',
  templateUrl: './create-periods.component.html',
  styleUrls: ['./create-periods.component.scss'],
})
export class CreatePeriodsComponent implements OnInit {

  listYears: Array<any>;
  selectYear: number;
  numPeriod: number;
  observations: string;
  formOk: boolean;

  numPeriods: number;
  listPeriods: Array<any>;

  cycleIdToEdit: string;
  observationsToEdit: string;
  numPeriodToEdit: number;
  statusToEdit: boolean;
  yearToEdit: number;
  formOkToEdit: boolean;

  cycleIdToRemove: string;
  yearToRemove: number;

  constructor(
    private sinicService: SinicPeriodService,
    private toast: ToastrService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.listYears = [{ id: '2022', year: '2022' }, { id: '2023', year: '2023' }, { id: '2024', year: '2024' },
    { id: '2025', year: '2025' }, { id: '2026', year: '2026' }, { id: '2027', year: '2027' }];
    this.selectYear = 0;
    this.numPeriod = 1;
    this.observations = '';
    this.formOk = false;

    this.numPeriods = 1;
    this.listPeriods = [];

    this.cycleIdToEdit = null;
    this.observationsToEdit = '';
    this.numPeriodToEdit = 0;
    this.statusToEdit = true;
    this.yearToEdit = 0;
    this.formOkToEdit = false;

    this.cycleIdToRemove = null;
    this.yearToEdit = 0;

    this.getCycles();
  }

  ngOnInit(): void { }

  save() {
    if (this.formOk) {
      const data = {
        "year": this.selectYear,
        "amountPeriods": this.numPeriod,
        "observations": this.observations
      }

      this.sinicService.createCycle(data).subscribe((element: any) => {
        this.toast.success('Se ha creado el ciclo correctamente.');
        this.getCycles();
        this.formOk = false;
      });
    }
  }

  cancel() {
    this.formOk = false;
    this.observations = '';
    this.numPeriod = 1;
    this.selectYear = 0;
  }

  verifyForm() {
    this.formOk = false;
    if (this.selectYear > 0 && this.observations !== '' && this.numPeriod >= 1) {
      this.formOk = true;
    }
  }

  verifyFormToEdit() {
    console.log('here --->')
    this.formOkToEdit = false;
    if (this.observationsToEdit !== '' && this.numPeriodToEdit >= 1) {
      this.formOkToEdit = true;
    }
  }

  load(item) {

  }

  getCycles() {
    this.sinicService.findCycles().subscribe((data: any) => {
      this.listPeriods = data;
      this.numPeriods = data.length;
    });
  }

  viewCycleDetail(cycleId: string) {
    this.router.navigate([
      `sinic/ciclos/${cycleId}/periodos`, {},
    ]);
  }

  openModalUpdateGroup(modal: TemplateRef<any>, item: any) {
    this.cycleIdToEdit = item.id;
    this.observationsToEdit = item.observations;
    this.numPeriodToEdit = item.amountPeriods;
    this.statusToEdit = item.status;
    this.yearToEdit = item.year;

    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }

  updateCycle() {

    if (this.formOkToEdit) {
      const data = {
        amountPeriods: this.numPeriodToEdit,
        observations: this.observationsToEdit,
        status: this.statusToEdit
      };

      this.sinicService.updateCycle(this.cycleIdToEdit, data).subscribe((data: any) => {
        this.toast.success('Se ha actualizado el ciclo correctamente.');
        this.getCycles();
        this.formOkToEdit = false;
        this.modalService.dismissAll();
      });
    }

  }

  openModalRemoveCycle(modal: TemplateRef<any>, item: any) {
    this.cycleIdToRemove = item.id;
    this.yearToRemove = item.year;

    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }

  deleteCycle() {
    if (this.cycleIdToRemove !== null) {
      this.sinicService.deleteCycle(this.cycleIdToRemove).subscribe((data: any) => {
        this.toast.success('Se ha eliminado el ciclo correctamente.');
        this.getCycles();
        this.modalService.dismissAll();
      });
    }
  }

}
