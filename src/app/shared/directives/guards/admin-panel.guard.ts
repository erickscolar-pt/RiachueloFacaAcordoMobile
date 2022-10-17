import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { AuthService } from '../../providers/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelGuard implements CanLoad, CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router) {}

    canLoad(): boolean {
      if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

    canActivate(): boolean {
      if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
}
