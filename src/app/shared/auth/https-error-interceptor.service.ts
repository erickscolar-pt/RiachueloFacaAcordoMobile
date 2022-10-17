import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FieldMessage, Message } from '../models/message';

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.defineMessage(error);
          return throwError(error)
        })
      )
  }
  defineMessage(error) {
    let status: number = error.error.status;
    let erro: Message = {};
    switch (status) {
      case 401:
        erro = this.handle401();
        break;
      case 403:
        erro = this.handle403();
        break;
      case 404:
        erro = this.handle404(error);
        break;
      case 422:
        erro = this.handle422(error);
        break;
      default:
        erro = this.handleDefault(error);
    }
    this.error(erro);
  }

  error(error) {
    Swal.fire({
      title: '<html><p>' + error.title + '</p></html>',
      text: error.message,
      imageUrl: 'assets/img/warning.png',
      footer: error.footer
    });
  }

  handle401() {
    let erro: Message = {};
    erro.title = 'Falha de autenticação'
    erro.message = 'Usuário ou senha incorretos'
    return erro;
  }
  handle403() {
    let erro: Message = {};
    erro.title = 'Ops...'
    erro.message = 'Você precisa se autenticar para acessar esse recurso'
    return erro;
  }
  handle404(error: HttpErrorResponse) {
    let erro: Message = {};
    erro.title = 'Ops...'
    if (error.error.message.match(/.*Não encontramos*/)
      || error.error.message.match(/.*Estamos passando*/)
      || error.error.message.match(/.*Tivemos um pequeno*/)
      || error.error.message.match(/.*tivemos um erro para salvar sua negociação*/)
      || error.error.message.match(/.*Não conseguimos gerar seu boleto no momento*/)
      || error.error.message.match(/.*Você já*/))
      erro.message = error.error.message
    else
      erro.message = 'Não foi possível localizar'
    return erro;
  }
  handle422(error: HttpErrorResponse) {
    let erro: Message = {};
    erro.title = 'Validação'
    erro.message = this.listError(error.error)
    return erro;
  }
  handleDefault(error: HttpErrorResponse) {
    let erro: Message = {};
    erro.title = 'Ops...'
    erro.message = 'Todos erram algum dia. Hoje foram nossos servidores :('
    return erro;
  }
  private listError(messages): string {
    let s: string = '';
    for (var i = 0; i < messages.erros.length; i++) {
      s = s + messages.erros[i].fieldName + ": " + messages.erros[i].message;
    }
    return s;
  }
}