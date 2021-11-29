import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SinicService } from '../sinic.service';
import Commons from '../commons/commons';
import { FuntionsGlobalsHelper } from 'src/app/shared/helpers/funtionsGlobals';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryId: number;
  delivery: any = {
    code: '',
    locality: {
      department: '',
      municipality: ''
    },
    manager: {
      name: ''
    },
    date: '',
    dateStatus: ''
  };
  isAdministrator: boolean = false;
  tab: number;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sinicService: SinicService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      this.isAdministrator = params.isAdministrator;
      let deliveryId = params.deliveryId;
      this.tab = params.tab;
      this.findDelivery(deliveryId);
    });
  }

  findDelivery(deliveryId: number) {
    this.sinicService.searchDelivery(deliveryId).subscribe(element => {
      this.delivery = element;
      console.log(this.delivery);
    });
  }
  nameStateDelivery(deliveryStatusId: string): string {
    return Commons.nameStateDelivery(deliveryStatusId);
  }
  formatDate(date: string) {
    return FuntionsGlobalsHelper.formatDate(date);
  }
  goBack() {
    this.router.navigate(['/sinic/listar-entregas/' + this.tab]);

  }
}
