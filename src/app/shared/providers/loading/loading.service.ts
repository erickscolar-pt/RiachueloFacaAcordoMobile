import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: boolean = false;
  private baseurl = environment.apiUrl;
  private http: HttpClient;
  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }
  setLoad() {
    this.isLoading = true;
  }

  stopLoad() {
    this.isLoading = false;
  }

  public acessoClient(tela: string, idUsu: string): Observable<any> {
    let idEmp = "12";
    return this.http.post<any>(`${this.baseurl}acesso/save?tela=${tela}&idEmpresa=${idEmp}&idUsuario=${idUsu}`, { observe: 'response' })
  }

  public getErrorCounter(msgErro: string) : Observable<boolean>  {
    let nomeEmpresa = document.location.hostname;
    return  this.http.get<boolean>(`${this.baseurl}error-counter?app=${nomeEmpresa}&erro=${msgErro}`);
  }
}
