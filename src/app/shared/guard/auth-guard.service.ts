import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../services/auth/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private serviceLogin: LoginService, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;
    const token = localStorage.getItem(environment.nameTokenSession);

    if (token) {
      const helper = new JwtHelperService();
      let decodedToken = null;
      try {
        decodedToken = helper.decodeToken(token);
      } catch (error) {
        decodedToken = null;
      }
      return new Promise((resolve, reject) => {
        this.serviceLogin.getSessions().subscribe(
          (data: any) => {
            const sessions = data.body;

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < sessions.length; i++) {
              const session = sessions[i];
              if (session.rjwt === decodedToken.rjwt) {
                result = true;
                break;
              }
            }
            resolve(result);
          },
          () => {
            localStorage.removeItem(environment.nameTokenSession);
            localStorage.removeItem('showMenu');
            result = false;
            this.route.navigate(['/login']);
            reject(result);
          }
        );
      });
    } else {
      localStorage.removeItem(environment.nameTokenSession);
      localStorage.removeItem('showMenu');
      result = false;
      this.route.navigate(['/login']);
    }
    return result;
  }
}
