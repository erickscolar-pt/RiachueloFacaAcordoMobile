import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/providers/user/user';
import Swal from 'sweetalert2';
import { Message } from 'src/app/shared/models/message';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseurl = environment.apiUrl;
  private http: HttpClient;

  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  public postRegister(user: User) {
    return this.http.post<User>(`${this.baseurl}users`, user)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.defineMessage(error);
        return throwError(error)
      })
    );
  }

  defineMessage(error){
    let status : number = error.error.status;
    let erro : Message = {};
    switch(status){
      case 422:
        erro = this.handle422(error);
        break;
      default:
        erro = this.handleDefault(error);
    }
    this.error(erro);
  }
  handle422(error: HttpErrorResponse){
    let erro : Message = {};
    erro.title = 'Usuário já existente'
    erro.message = this.listError(error.error)
    return erro;
  }
  handleDefault(error: HttpErrorResponse) {
    let erro: Message = {};
    erro.title = 'Ops...'
    erro.message = 'Por favor tente mais tarde...'
    return erro;
  }
  error(error){
    Swal.fire({
      title: '<html><p>' + error.title + '</p></html>',
      text: error.message,
      imageUrl: 'assets/img/warning.png',
      footer: error.footer
    });
  }
  private listError(messages) : string {
    let s : string = '';
    for(var i=0; i<messages.erros.length; i++){
        s = s + messages.erros[i].message;
    }
    return s;
}

}
