import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';

@Component({
  selector: 'app-report-snr',
  templateUrl: './report-snr.component.html',
  styleUrls: ['./report-snr.component.scss'],
})
export class ReportSnrComponent implements OnInit {
  fromDate: string = '';
  toDate: string = '';
  isSelectFields: boolean = false;
  constructor(
    private providersService: ProvidersService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  changeData() {
    this.isSelectFields = false;
    if (this.fromDate != '' && this.toDate != '') {
      this.isSelectFields = true;
    }
  }
  generateReport() {
    this.providersService
      .getReportSuppliesDelivered(this.fromDate, this.toDate)
      .subscribe(
        (data) => {
          FuntionsGlobalsHelper.downloadFile(data, '.pdf');
        },
        (error) => {
          this.toastrService.error(
            'No se han encontrado solicitudes para el período de tiempo seleccionado.'
          );
          console.log();
        }
      );
  }
}
