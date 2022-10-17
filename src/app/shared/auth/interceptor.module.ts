import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsRequestInterceptorService } from './https-request-interceptor.service';

@NgModule({
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: HttpsRequestInterceptorService,
     multi: true,
    },
   ]
})
export class InterceptorModule { }
