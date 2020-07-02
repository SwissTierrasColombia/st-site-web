import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { FuntionsGlobalsHelper } from 'src/app/helpers/funtionsGlobals';
import { ModalService } from 'src/app/services/modal/modal.service';


@Component({
  selector: 'app-integrations-running',
  templateUrl: './integrations-running.component.html',
  styleUrls: ['./integrations-running.component.scss']
})
export class IntegrationsRunningComponent implements OnInit {

  dataIntegration: any;
  selectIntegration: any;
  constructor(
    private router: Router,
    private serviceWorkspace: WorkspacesService,
    private modalService: ModalService) {
    this.dataIntegration = [];
    this.selectIntegration = [];
  }

  ngOnInit(): void {
    this.serviceWorkspace.GetIntegrationRunning().subscribe(
      data => {
        this.dataIntegration = data;
      }
    );
  }
  volver() {
    this.router.navigate(['/insumos/integracion']);
  }
  globalFuntionDate(date: any) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  parcelNumber(number: number) {
    return new Intl.NumberFormat().format(number);
  }
  roundDecimal(num: any) {
    return Math.round(num * 100) / 100;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(item: any, modal: string) {
    this.selectIntegration = item;
    this.modalService.open(modal);
  }
}
