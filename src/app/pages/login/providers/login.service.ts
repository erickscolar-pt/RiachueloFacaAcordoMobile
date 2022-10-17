import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpBackend, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../login-dto';
import { Mail } from 'src/app/shared/mail-form/mail-form';
import { JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseurl = environment.apiUrl;
  private http: HttpClient;
  private jwtHelper = new JwtHelperService();
  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  public postLogin(user: LoginDTO): Observable<any> {
    return this.http.post<any>(`${this.baseurl}login`, user, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
  public disableLogin(cpfOrCnpj : string): Observable<any>{
    return this.http.patch<any>(`${this.baseurl}users/disable/${cpfOrCnpj}`, {observe : 'response'})
  }

  public bloqueio(cpf: string, bloq: string): Observable<any> {
    //console.log('blq => ' + bloq)
    return this.http.post<any>(`${this.baseurl}users/bloqueio/?cpf=${cpf}&bloq=${bloq}`, {  })
}

  public generatePin() : Observable<any> {
    let cpf = localStorage.getItem('cpf');
    return this.http.get<any>(`${this.baseurl}original/pin/${cpf}`, { observe: 'response' });
  }

  public generatePinSms() : Observable<any> {
    let cpf = localStorage.getItem('cpf');
    return this.http.get<any>(`${this.baseurl}original/pin/sms/${cpf}`, { observe: 'response' });
  }
  public comparePin(code : string, codeBack : string){
    let pin = this.jwtHelper.decodeToken(codeBack).sub
    let status = pin === code ? true : false;
    return status;
  }
  public getExistUser(cpfOrCnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseurl}users/exist?cpfOrCnpj=${cpfOrCnpj}`);
  }

  public postMail(mail: Mail) {
    return this.http.post<any>(`${this.baseurl}form/mailForm`, mail);
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 403:
        return throwError('Login ou senha inválidos!');

      default:
        return throwError('Por favor tente mais tarde...');
    }
  }
}
