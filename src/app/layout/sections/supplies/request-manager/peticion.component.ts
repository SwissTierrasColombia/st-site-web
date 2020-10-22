import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import * as _moment from 'moment';

const moment = _moment;
@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.scss'],
})
export class PeticionComponent implements OnInit {
  providers: any;
  data: any;
  petitionsForManager: any;
  enviarPeticion: boolean;
  providerIdPetition: string;
  providersActive: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private serviceProviders: ProvidersService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {
    this.providers = [];
    this.providersActive = [];
    this.data = {
      providerId: '0',
      description: '',
    };
    this.petitionsForManager = [];
    this.enviarPeticion = false;
    this.providerIdPetition = '0';
  }
  ngOnInit(): void {
    this.serviceProviders.getProviders().subscribe((element) => {
      this.providers = element;
    });
    this.serviceProviders.getProvidersActive().subscribe((element) => {
      this.providersActive = element;
    });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeStatePetition() {
    this.enviarPeticion = false;
    if (this.data.providerId !== '0' && this.data.description.length > 0) {
      this.enviarPeticion = true;
    }
  }
  openModalPeticion(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalPeticion(option: boolean) {
    if (option) {
      this.serviceWorkspaces.createPetition(this.data).subscribe((_) => {
        this.toast.success('Petición enviada correctamente.');
        this.data = {
          providerId: '0',
          description: '',
        };
        this.enviarPeticion = false;
      });
    }
    this.modalService.dismissAll();
  }
  changeStateGetPetition() {
    this.petitionsForManager = [];
    if (this.petitionsForManager !== '0') {
      this.serviceWorkspaces
        .getPetitionsForManager(this.providerIdPetition)
        .subscribe((response) => {
          this.petitionsForManager = response;
        });
    }
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('Do MMM YYYY');
  }
}
