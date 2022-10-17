import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoverService {
  private baseurl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  //  Esse método deveria ser um Patch e não um post
  public patchPassword(cpfCnpj: string, url : string) {
    let newPassword = {
      cpfCnpj,url
    }
    return this.http.post<any>(`${this.baseurl}users/newPassword`, newPassword);
  }
}
