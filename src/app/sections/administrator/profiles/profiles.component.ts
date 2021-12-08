import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  dataProfile: any;
  data: any;
  idProfileDelete: number;
  editMode: boolean;
  formOk: boolean;
  id: number;
  optionModalRef: NgbModalRef;
  constructor(
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {
    this.dataProfile = [];
    this.data = {
      name: '',
      description: '',
    };
    this.idProfileDelete = 0;
    this.editMode = false;
    this.formOk = false;
    this.id = 0;
  }
  ngOnInit(): void {
    this.serviceWorkSpace.GetProviderProfiles().subscribe((element) => {
      this.dataProfile = element;
      this.dataProfile.sort((a, b) => a.id - b.id);
    });
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeState() {
    if (this.data.description == null) {
      this.formOk = false;
    } else {
      if (this.data.name != '' && this.data.description != '') {
        this.formOk = true;
        if (!this.nitIsValid(this.data.taxIdentificationNumber)) {
          this.formOk = false;
        }
      } else {
        this.formOk = false;
      }
    }
  }
  updateProfile(item: any) {
    this.data = this.clone(item);
    this.id = this.data.id;
    this.editMode = true;
  }
  deleteProfile(id: number) {
    this.idProfileDelete = id;
    this.optionModalRef = this.modalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    this.optionModalRef.componentInstance.title =
      '¿Está seguro de Eliminar el Perfil?';
    this.optionModalRef.componentInstance.description =
      'Advertencia: Esta acción eliminará el perfil.';
    this.optionModalRef.result.then((result) => {
      if (result) {
        if (result.option) {
          this.serviceWorkSpace
            .deleteProfileProvider(this.idProfileDelete)
            .subscribe((_) => {
              this.toast.success('Ha eliminado correctamente el perfil.');
              this.idProfileDelete = 0;
              this.serviceWorkSpace
                .GetProviderProfiles()
                .subscribe((element) => {
                  this.dataProfile = element;
                  this.dataProfile.sort((a, b) => a.id - b.id);
                });
            });
        }
      }
    });
  }
  nitIsValid(dato) {
    const nit = dato.trim();
    if (nit.length === 10 || nit.length === 11) {
      var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');
      if (nitRegExp.test(nit)) {
        return true;
      }
    } else {
      this.toast.error(
        'El Número de Identificación Tributaria (NIT) no es correcto, ejemplo: XXXXXXXXX-Y'
      );
      this.formOk = false;
    }
  }
  create() {
    this.serviceWorkSpace.createProfile(this.data).subscribe((element) => {
      this.dataProfile.push(element);
      this.data = {
        name: '',
        description: '',
      };
      this.toast.success('Se ha creado el perfil correctamente.');
      this.cancel();
    });
  }
  save() {
    this.serviceWorkSpace
      .updateProfileProvider(this.data, this.data.id)
      .subscribe((_) => {
        this.toast.success('Se ha actualizado el perfil correctamente.');
        this.data = {
          name: '',
          description: '',
        };
        this.cancel();
        this.serviceWorkSpace.GetProviderProfiles().subscribe((element) => {
          this.dataProfile = element;
          this.dataProfile.sort((a, b) => a.id - b.id);
        });
      });
  }
  cancel() {
    this.id = 0;
    this.editMode = false;
    this.formOk = false;
    this.data = {
      name: '',
      description: '',
    };
  }
}
