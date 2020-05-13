import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  dataProfile: any;
  data: any;
  stateButton: boolean;
  idProfileDelete: number;
  activeButton: boolean;
  constructor(
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService,
    private modalService: ModalService) {
    this.dataProfile = [];
    this.data = {
      name: "",
      description: ""
    }
    this.stateButton = true;
    this.activeButton = true;
    this.idProfileDelete = 0;
  }
  ngOnInit(): void {
    this.serviceWorkSpace.GetProviderProfiles().subscribe(
      element => {
        this.dataProfile = element;
        this.dataProfile.sort((a, b) => a.id - b.id);
      }
    );
  }
  clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
  changeState() {
    if (this.data.name != "" || this.data.description != "") {
      this.activeButton = false;
    }
  }
  submitChange() {
    if (this.stateButton) {
      this.serviceWorkSpace.createProfile(this.data).subscribe(
        element => {
          this.dataProfile.push(element);
          this.data = {
            name: "",
            description: ""
          }
          this.toast.success("Se ha creado el perfil correctamente.");
          this.activeButton = true;
        }
      )
    } else {
      this.serviceWorkSpace.updateProfileProvider(this.data, this.data.id).subscribe(
        _ => {
          this.toast.success("Se ha actualizado el perfil correctamente.");
          this.activeButton = true;
          this.stateButton = true;
          this.data = {
            name: "",
            description: ""
          }
          this.serviceWorkSpace.GetProviderProfiles().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
            }
          );
        }
      );
    }
  }
  updateProfile(item: any) {
    this.stateButton = false;
    this.data = this.clone(item);
  }
  deleteProfile(modal: string, id: number) {
    this.modalService.open(modal)
    this.idProfileDelete = id;
  }
  closeModalDisabled(modal: string, option: boolean) {
    if (option) {
      this.serviceWorkSpace.deleteProfileProvider(this.idProfileDelete).subscribe(
        _ => {
          this.toast.success("Ha eliminado correctamente el perfil.");
          this.idProfileDelete = 0;
          this.serviceWorkSpace.GetProviderProfiles().subscribe(
            element => {
              this.dataProfile = element;
              this.dataProfile.sort((a, b) => a.id - b.id);
            }
          );
        }
      );
      this.modalService.close(modal);
    } else {
      this.modalService.close(modal);
    }
  }

}
