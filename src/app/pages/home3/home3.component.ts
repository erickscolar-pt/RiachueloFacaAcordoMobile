import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CpfCnpjValidator } from 'src/app/shared/directives/Validator/cpf-cnpj-validator';
import { Meta } from '@angular/platform-browser';
import { homeBackground, mobileDefault, homeAlt, topImage } from 'src/app/shared/providers/background';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/providers/user/user';
import Swal from 'sweetalert2';
import { LoginService } from '../login/providers/login.service';

import { fundoInicio } from 'src/app/shared/providers/background';

import { HostListener } from '@angular/core';
import { $ } from 'protractor';
import { AuthService } from 'src/app/shared/providers/user/auth.service';

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})
export class Home3Component implements OnInit {
  public fundoImage = fundoInicio;
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
    this.meta.addTag({ name: 'description', content: 'A maneira mais fácil de limpar seu nome e quitar suas dívidas online. A Faça Acordo oferece desconto na negociação de uma dívida ativa. Pague com boleto bancário ou cartão de crédito. Sem telefonema, sem burocracia.' });
    this.meta.addTag({ name: 'author', content: 'Nicolas Cruz' });
    this.meta.addTag({ name: 'keywords', content: 'Dívidas, Quitar, Renegociar' });
  }

  ngOnInit() {
    this.onScroll();
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

  @HostListener('window:scroll', ['$event']) // for window scroll events
    public onScroll() {

     const target = <HTMLElement[]><any> document.querySelectorAll('[data-anime]') ; ///document.querySelectorAll('[data-anime]');
     const animationClass = 'animate';
     const windowTop = window.pageYOffset + ((window.innerHeight * 3.2) / 8);

     target.forEach(function(elementt){
       if((windowTop) > elementt.getBoundingClientRect().top){
         elementt.classList.add(animationClass);
       }
       else{
          elementt.classList.remove(animationClass);
       }
      })
  }
}
