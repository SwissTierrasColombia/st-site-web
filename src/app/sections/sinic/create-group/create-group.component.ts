import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SinicPeriodService } from 'src/app/sections/sinic/sinic-period.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  groups: Array<any>;
  groupName: string;
  formOk: boolean;

  groupIdToEdit: string;
  groupNameToEdit: string;

  constructor(
    private sinicService: SinicPeriodService,
    private toast: ToastrService,
    private modalService: NgbModal,
  ) {
    this.groups = [];
    this.groupName = '';
    this.formOk = false;

    this.groupIdToEdit = null;
    this.groupNameToEdit = '';
  }

  ngOnInit(): void {
    this.getGroups();
  }

  saveGroup() {
    this.sinicService.createGroup({ name: this.groupName }).subscribe((element: any) => {
      this.groups.push({ name: this.groupName });
      this.toast.success('Se ha creado el grupo correctamente.');
      this.formOk = false;
    });
  }

  cancel() {
    this.formOk = false;
    this.groupName = '';
  }

  getGroups() {
    this.sinicService.findGroups().subscribe((data: any) => {
      this.groups = data;
    });
  }

  verifyForm() {
    this.formOk = false;
    if (this.groupName !== '') {
      this.formOk = true;
    }
  }

  openModalUpdateGroup(modal: TemplateRef<any>, groupId: string, groupName: string) {
    this.groupIdToEdit = groupId;
    this.groupNameToEdit = groupName;
    this.modalService.open(modal, {
      centered: true,
      scrollable: true,
    });
  }

  updateGroup() {
    if (this.groupIdToEdit !== null && this.groupIdToEdit !== '' && this.groupNameToEdit !== '') {
      this.sinicService.updateGroup(this.groupIdToEdit, { "name": this.groupNameToEdit }).subscribe((_) => {
        this.modalService.dismissAll();
        this.toast.success('Se ha actualizado el grupo!');
        this.getGroups();
      });
    } else {
      this.toast.error('El nombre del grupo es requerido');
    }
  }

}
