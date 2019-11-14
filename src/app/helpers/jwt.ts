import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export class JwtHelper {

    static closeSession(router) {
        localStorage.removeItem(environment.nameTokenSession);
        router.navigate(['/login']);
    }

    static getUserPublicInformation() {
        const token = localStorage.getItem(environment.nameTokenSession);
        const helper = new JwtHelperService();

        let decodedToken = null;
        try {
            decodedToken = helper.decodeToken(token);
        } catch (error) {
            decodedToken = null;
        }
        return (decodedToken) ? decodedToken.dataToken : false;
    }

}