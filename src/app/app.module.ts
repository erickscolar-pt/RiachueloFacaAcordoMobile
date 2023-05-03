import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MAT_DATE_LOCALE, MatCardModule, MatTooltipModule } from '@angular/material';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { CpfCnpjDirective } from './shared/directives/Validator/cpf-cnpj.directive';
import { UserFormModule } from './shared/components/user-form/user-form.module';
import { AuthService } from './shared/providers/user/auth.service';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InterceptorModule } from './shared/auth/interceptor.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { HomeService } from './shared/providers/home/home.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from './shared/providers/loading/loading.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TermosComponent } from './shared/components/termos/termos.component';
import { TermosModule } from './shared/components/termos/termos.module';
import { PicPayComponent } from './shared/components/picpay/picpay.component';
import { PicpayModule } from './shared/components/picpay/picpay.module';
import { FaqComponent } from './pages/faq/faq.component';
import { WidgetComponent } from './shared/components/widget/widget.component';
import { MailFormComponent } from './shared/mail-form/components/mail-form/mail-form.component';
import { MailFormModule } from './shared/mail-form/mail-form.module';
import { GoogleAnalyticsService } from './shared/google-analytics/google-analytics.service';
import { FormCouponComponent } from './pages/coupon/components/form-coupon/form-coupon.component';
import { CouponModule } from './pages/coupon/coupon.module';
import { NotFoundOptionComponent } from './pages/not-found-option/not-found-option.component';
import { SnackBarComponent } from './pages/snack-bar/snack-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/auth/https-error-interceptor.service';
import { LoginGuard } from './shared/directives/guards/loading-routes.guard';
import { DebtGuard } from './shared/directives/guards/debt-routes.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { SegundaViaComponent } from './pages/segunda-via/segunda-via.component';
import { Home2Component } from './pages/home2/home2.component';
import { Whatsapp3Component } from './pages/whatsapp3/whatsapp3.component';
import { Whatsapp2Component } from './pages/whatsapp2/whatsapp2.component';
import { Whatsapp1Component } from './pages/whatsapp1/whatsapp1.component';
import { PicpayComponent2 } from './pages/picpay/picpay.component';
import { PaguecomprandoComponent } from './pages/paguecomprando/paguecomprando.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { PrivacyPolicyModule } from './shared/components/privacy-policy/PrivacyPolicy.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CodeInputModule } from 'angular-code-input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Home3Component } from './pages/home3/home3.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    CpfCnpjDirective,
    LoadingComponent,
    FooterComponent,
    HowItWorksComponent,
    FaqComponent,
    WidgetComponent,
    NotFoundOptionComponent,
    SnackBarComponent,
    Whatsapp1Component,
    Whatsapp2Component,
    Whatsapp3Component,
    Home2Component,
    SegundaViaComponent,
    PicpayComponent2,
    PaguecomprandoComponent,
    Home3Component
  ],
  imports: [
    MatCheckboxModule,
    BrowserModule,
    CodeInputModule.forRoot({
      codeLength: 6,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    UserFormModule,
    MatListModule,
    MatIconModule,
    InterceptorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    MatMenuModule,
    JwtModule.forRoot({
      config: {
        skipWhenExpired: true,
        tokenGetter,
        whitelistedDomains: [environment.apiUrl],
        blacklistedRoutes: [`${environment.apiUrl}users`]
      }
    }),
    SweetAlert2Module.forRoot(),
    NgxLoadingModule.forRoot({}),
    FontAwesomeModule,
    TermosModule,
    PrivacyPolicyModule,
    PicpayModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MailFormModule,
    CouponModule,
    NgxMatFileInputModule,
    HttpClientModule,
    MatCarouselModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: LoginGuard, useClass: LoginGuard},
    { provide: DebtGuard, useClass: DebtGuard},
    AuthService,
    HomeService,
    LoadingService,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserFormComponent,
    TermosComponent,
    PrivacyPolicyComponent,
    PicPayComponent,
    MailFormComponent,
    FormCouponComponent
  ],
})
export class AppModule {}
