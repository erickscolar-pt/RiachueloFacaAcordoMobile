import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CpfCnpjValidator } from 'src/app/shared/directives/Validator/cpf-cnpj-validator';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { AuthService } from 'src/app/shared/providers/user/auth.service';
import { User } from 'src/app/shared/providers/user/user';
import { LoginService } from '../login/providers/login.service';
import { homeBackground, mobileDefault, homeAlt, topImage } from 'src/app/shared/providers/background';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {
  public bg = homeBackground;
  public bgMobile = mobileDefault;
  public bgAlt = homeAlt;
  public topImage=topImage;
  public search = {
    cpfOrCnpj: new FormControl(
      '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
        CpfCnpjValidator.validate
      ]
    )
  };
  constructor(
    private meta: Meta,
    public auth: AuthService,
    private gaAnalytics: GoogleAnalyticsService,
    private loading: LoadingService,
    public router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
  }

  entrar(){
    this.router.navigate(['/login'])
  }

  public checkCPF(user: User) {
    const Observer = {
      next: (response) => {
        this.loading.stopLoad();
        this.gaAnalytics.eventEmitter('auth', 'buscarCPF', user.cpfOrCnpj);
        if (response) {
          this.router.navigate(['/login'], { queryParams : { cpfOrCnpj : user.cpfOrCnpj } });
        } else {
          this.router.navigate(['/register'], { queryParams : { cpfOrCnpj : user.cpfOrCnpj } });
        }
      },
      error: (err) => {
        this.loading.stopLoad();
      }
    };
    this.loginService.getExistUser(user.cpfOrCnpj)
    .subscribe(Observer);
  }
  navigate(){
    this.router.navigate(['/debt'])
  }

}
