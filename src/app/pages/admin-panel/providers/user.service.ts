import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserVO } from 'src/app/shared/providers/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

/* Codigo comentado abaixo é antigo */

/*   public get(pageSize: number, pageNuber): Observable<any> {
    let carteira: string = "Riachuelo";
    return this.http.get<any>(`${environment.apiUrl}users/page?page=${pageNuber}&linesPerPage=${pageSize}&orderBy=id&direction=ASC&carteira=${carteira}`);
  } */


  /* Codigo atual para pesquisa da data do usuario criado e baixar relatorio de usuario */
  public get(pageSize: number, pageIndex:number , inicio?: string, fim?: string): Observable<any> {
    let carteira: string = "Riachuelo";
    let params = new HttpParams();
    if(inicio){
      params = params.append('inicio', inicio);
    }
    if(fim){
      params = params.append('fim', fim);
    }
    return this.http.get<any>(`${environment.apiUrl}users/search?page=${pageIndex}&linesPerPage=${pageSize}&orderBy=id&direction=ASC&carteira=${carteira}`, {params});
  }

  public put(user: UserVO) {
    return this.http.put<any>(`${environment.apiUrl}users`, user);
  }


  /* Excel */
  public getUserReport(inicio?: string, fim?: string): Observable<any> {
    let carteira: string = "Riachuelo";
    let params = new HttpParams();
    if(inicio){
      params = params.append('inicio', inicio);
    }
    if(fim){
      params = params.append('fim', fim);
    }
    return this.http.get<any>(`${environment.apiUrl}users/reportExcel?carteira=${carteira}`, {params});
  }


  public patchActivate(id: number) {
    return this.http.patch<any>(`${environment.apiUrl}users/activeDisable/${id}`, null);
  }

  public patchAdmin(id: string) {
    return this.http.patch<any>(`${environment.apiUrl}users/adm/${id}`, null);
  }
}
