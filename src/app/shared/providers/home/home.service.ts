import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from './home';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private http: HttpClient;
  private baseurl = environment.apiUrl;

  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  public getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(`${this.baseurl}company/partners`);
  }
}
