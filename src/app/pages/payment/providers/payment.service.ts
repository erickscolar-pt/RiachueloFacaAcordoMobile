import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DealDTO } from 'src/app/shared/models/deal';

import { Payment } from 'src/app/shared/providers/user/user';
import { SaveDealDTO } from '../../debt/providers/debt';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseurl = environment;
  private httpBack: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    this.httpBack = new HttpClient(handler);
  }

  public teste(callback){
    setTimeout(() => {
      return callback("OK");
    }, 3000);
  }
  public postGenerateDeal(deal: SaveDealDTO): Observable<any> {
    return this.http.post<any>(`${this.baseurl.apiUrl}deal`, deal);
  }

  public getAccountId(): Observable<any> {
    return this.http.get<any>(`${this.baseurl.apiUrl}partner/keyIugu`);
  }

  public postFile(formData: FormData): Observable<any> {
    const httpOptions = {
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(`${this.baseurl.apiUrl}payment/upload`, formData, httpOptions);
  }

  public getAddress(cep: string): Observable<any> {
    return this.httpBack.get<any>(`${this.baseurl.correios}${cep}/json`);
  }
}