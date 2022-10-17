import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  public getDeals(inicio?: string, fim?: string, companyriachuelo?: string, companyriachuelo2?: string): Observable<any> {
    let params = new HttpParams();
    var companyriachuelo = "6";
    var companyriachuelo2 = "7";
    if (inicio) {
      params = params.append('inicio', inicio);
    }
    if (fim) {
      params = params.append('fim', fim);
    }
    if(companyriachuelo){
      params = params.append('idriachuelo', companyriachuelo)
    }
    if(companyriachuelo2){
      params = params.append('idriachuelo2', companyriachuelo2)
    }
    return this.http.get<any>(`${environment.apiUrl}report/deal`, { params });
  }
  

  // Codigo abaixo recebe parametros e manda para Query no backend,
  // precisei colocar dois parametros a mais (6 e 7) pq na Dashboard estava pegando somente da carteira 12
  //Dashboard
  public getDealbyRange(inicio?: string, fim?: string, companyriachuelo?: string, companyriachuelo2?: string): Observable<any> {
    let params = new HttpParams();
    var companyriachuelo = "6";
    var companyriachuelo2 = "7";
    if (inicio) {
      params = params.append('inicio', inicio);
    }
    if (fim) {
      params = params.append('fim', fim);
    }
    if(companyriachuelo){
      params = params.append('companyriachuelo', companyriachuelo)
    }
    if(companyriachuelo2){
      params = params.append('companyriachuelo2', companyriachuelo2)
    }
    return this.http.get<any>(`${environment.apiUrl}report/dealRange/12`, { params });
  }

  private newMethod() {
    return 6;
  }

  //Excel
  public getReportRange(inicio?: string, fim?: string, companyriachuelo?: string, companyriachuelo2?: string): Observable<any>{
    let params = new HttpParams();
    var companyriachuelo = "6";
    var companyriachuelo2 = "7";
    if(inicio){
      params = params.append('inicio', inicio);
    }
    if(fim){
      params = params.append('fim', fim);
    }
    if(companyriachuelo){
      params = params.append('companyriachuelo', companyriachuelo)
    }
    if(companyriachuelo2){
      params = params.append('companyriachuelo2', companyriachuelo2)
    }
    return this.http.get<any>(`${environment.apiUrl}original/report/12`, {params});
  }
}
