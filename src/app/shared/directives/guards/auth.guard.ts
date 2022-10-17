import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from '../../providers/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    public auth: AuthService,
    public router: Router) {}

  canLoad(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    if (this.auth.isAdmin()) {
      this.router.navigate(['dashboard']);
      return true;
    }
    return true;
  }
}
