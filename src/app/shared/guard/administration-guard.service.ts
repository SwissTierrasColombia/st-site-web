import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from '../helpers/jwt';
import { RoleModel } from '../helpers/role.model';
@Injectable()
export class AdministrationGuard implements CanActivate {
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
        return (
          elem.id == this.roles.superAdministrador ||
          elem.id == this.roles.administrador ||
          (this.rol.is_manager_director == this.roles.gestorDirector &&
            elem.id == this.roles.gestor) ||
          (this.rol.is_provider_director == this.roles.proveedorDirector &&
            elem.id == this.roles.proveedor)
        );
      });
      if (!role) {
        this.router.navigate(['/inicio']);
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }
}
