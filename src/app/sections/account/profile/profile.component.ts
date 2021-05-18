import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'src/app/helpers/jwt';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  password: string;
  confirmationPassword: string;
  mensaje: any;
  changepass: boolean;
  constructor(
    private serviceWorkSpace: WorkspacesService,
    private toast: ToastrService
  ) {
    this.profile = {};
    this.password = '';
    this.confirmationPassword = '';
    this.changepass = true;
  }

  ngOnInit() {
    this.profile = JwtHelper.getUserPublicInformation();
  }
  passIqual() {
    if (this.password === this.confirmationPassword) {
      this.mensaje = 2;
      this.changepass = false;
    } else {
      this.mensaje = 1;
      this.changepass = true;
    }
  }
  submitChangePass() {
    const data = {
      password: this.password,
    };
    this.serviceWorkSpace.changePassword(data).subscribe((_) => {
      this.password = '';
      this.confirmationPassword = '';
      this.toast.success('Ha actualizado su contraseña.');
      this.changepass = true;
    });
  }
}
