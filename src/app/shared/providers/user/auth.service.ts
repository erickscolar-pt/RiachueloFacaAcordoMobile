import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    protected localStorage: LocalStorage,
    public jwtHelper: JwtHelperService
    ) { }

  public isAdmin() {
    if (this.getToken() && this.isAuthenticated()) {
      const roles: string[] = decode(this.getToken()).role;
      const isAdmin = roles.filter(role => role === 'ADMIN').length > 0 ? true : false;
      return isAdmin;
    }
    return false;
  }

  public isMaster() {
    if(this.getToken() && this.isAuthenticated()){
      const roles: string[] = decode(this.getToken()).role;
      const isMaster = roles.filter(role => role === 'ADMIN_MASTER').length > 0 ? true : false;
      return isMaster;
    }
    return false;
  }

  public clearTokenStorage() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(token) {
    localStorage.setItem('token', token);
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }
}
