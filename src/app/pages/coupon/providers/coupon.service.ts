import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from './coupon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}promoteCod`);
  }

  public post(coupon: Coupon) {
    return this.http.post<any>(`${environment.apiUrl}promoteCod`, coupon);
  }

  public patch(id: string) {
    return this.http.patch<any>(`${environment.apiUrl}promoteCod/enableDisable/${id}`, null);
  }
}
