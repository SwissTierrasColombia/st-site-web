import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import * as _moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const moment = _moment;

@Component({
  selector: 'app-peticiones-proveedor',
  templateUrl: './peticiones-proveedor.component.html',
  styleUrls: ['./peticiones-proveedor.component.scss']
})
export class PeticionesProveedorComponent implements OnInit {
  petitionsForManagerOpen: any;
  petitionsForManagerClose: any;
  open: boolean;
  isJustification: boolean;
  petitionId: number;
  data: any;
  constructor(
    private serviceWorkspaces: WorkspacesService,
    private modalService: NgbModal,
    private toast: ToastrService,
    private router: Router
  ) {
    this.petitionsForManagerOpen = [];
    this.petitionsForManagerClose = [];
    this.open = true;
    this.isJustification = false;
    this.data = {
      justification: ''
    }
  }

  ngOnInit(): void {
    this.serviceWorkspaces.getPetitionsForProviderOpen().subscribe(response => {
      this.petitionsForManagerOpen = response;
    });
    this.serviceWorkspaces.getPetitionsForProviderClose().subscribe(response => {
      this.petitionsForManagerClose = response;
    });
  }
  formatDate(date: string) {
    moment.locale('es');
    return moment(date).format('ll');
  }
  changeStatePetition() {
    this.isJustification = false;
    if (this.data.justification !== '') {
      this.isJustification = true;
    }
  }
  openModal(modal: any) {
    this.modalService.open(modal, { centered: true, scrollable: true });
  }
  closeModalAceptar(option: boolean, itemId?: number) {
    if (option) {
      this.serviceWorkspaces.acceptPetition(itemId, this.data).subscribe(_ => {
        this.toast.success('Por favor diligencie el formulario y cree el insumo en el Sistema', 'Petición aceptada');
        this.isJustification = false;
        this.data = {
          justification: ''
        }
        this.router.navigate(['/insumos/caracterizacion/insumo', { tab: 2, isValidTab: false }]);

        this.serviceWorkspaces.getPetitionsForProviderOpen().subscribe(response => {
          this.petitionsForManagerOpen = response;
        });
        this.serviceWorkspaces.getPetitionsForProviderClose().subscribe(response => {
          this.petitionsForManagerClose = response;
        });
      });
    }
    this.data = {
      justification: ''
    }
    this.modalService.dismissAll();
  }
  closeModalRechazar(option: boolean, itemId?: number) {
    if (option) {
      this.serviceWorkspaces.rejectPetition(itemId, this.data).subscribe(_ => {
        this.toast.success('Petición rechazada');
        this.isJustification = false;
        this.data = {
          justification: ''
        }
        this.serviceWorkspaces.getPetitionsForProviderOpen().subscribe(response => {
          this.petitionsForManagerOpen = response;
        });
        this.serviceWorkspaces.getPetitionsForProviderClose().subscribe(response => {
          this.petitionsForManagerClose = response;
        });
      });
    }
    this.data = {
      justification: ''
    }
    this.modalService.dismissAll();
  }

}
