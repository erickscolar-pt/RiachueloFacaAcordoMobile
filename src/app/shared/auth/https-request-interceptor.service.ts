import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../providers/user/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptorService implements HttpInterceptor {

  private baseurl = environment.apiUrl;
  constructor(
    private authService: AuthService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
   ): Observable<HttpEvent<any>> {
     if (this.authService.isAuthenticated()) {
      const dupReq = req.clone({
        headers: req.headers.set('Authorization', this.authService.getToken()),
      });
      return next.handle(dupReq);
     }
     return next.handle(req);
   }
}
