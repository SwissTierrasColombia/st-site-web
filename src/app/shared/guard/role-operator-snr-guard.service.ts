import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from '../helpers/jwt';
import { RoleModel } from '../helpers/role.model';
@Injectable()
export class RoleOperatorSnrGuard implements CanActivate {
  rol: any;

  constructor(private roles: RoleModel, private router: Router) {
    this.rol = JwtHelper.getUserPublicInformation();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.rol) {
      const role = this.rol.roles.find((elem) => {
        return elem.id === this.roles.operador;
      });
      let snr = false;
      if (this.rol.entity.id === 8) {
        snr = true;
      }
      if (!role && !snr) {
        this.router.navigate(['/inicio']);
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }
}
