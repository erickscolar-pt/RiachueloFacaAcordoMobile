import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../providers/user/auth.service";


@Injectable()
export class DebtGuard implements CanActivate {

    constructor(public auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       const rota = this.router.url.split('=')[0]
       if(rota.match(/.*company*/) && localStorage.getItem('reload') != null){
           localStorage.removeItem('reload');
        return true;
       } else if(rota.match(/.*company*/) && localStorage.getItem('reload') == null){
           localStorage.setItem('reload', 'true');
          // this.router.navigate(['/debt']);
           window.location.reload()
         //   this.canActivate(route, state)
           return true;
       } else{
           return true;
       }
    }
}