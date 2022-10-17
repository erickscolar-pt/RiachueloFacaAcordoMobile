import { Component, OnChanges, AfterViewChecked, AfterViewInit, AfterContentChecked, DoCheck, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../providers/user/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../providers/loading/loading.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements DoCheck {

  @Input() public currentRouter: any;
  public readonly menu = faBars;
  public headerNavOptions = [ ];
  public authenticated = false;
  public readonly faq = 'faq';
  public readonly logout = 'sair';
  public href: string = "";

  paramsUrl: any;
  rota : any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute) {}

  public scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  public opt(opt) {
    const par = this.router.url.split('=')[0]


    if(opt == "whatsapp"){
      return window.open("https://api.whatsapp.com/send?phone=5511964392624&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
    }

    if(opt == "lojavirtual"){
      return window.open("https://paguecomprando.com.br/")
    }

    if(opt == "blog"){
      return window.open("https://blog.facaacordo.com.br")
    }

    if (opt === this.logout) {
      if(!this.auth.isAdmin() && !this.auth.isMaster()){
        this.auth.clearTokenStorage();
        return this.router.navigate(['login']);
      } else {
        this.auth.clearTokenStorage();
        return window.location.reload();
      }

    }

    if(opt == 'debt'){
      if(par.match(/.*debt*/) && !par.match(/.*warning*/) && !par.match(/.*success*/) ){
        localStorage.setItem('reload', 'true');
        window.location.reload()
        sessionStorage.clear();
        return
      }


      return this.router.navigate(['/debt']);
    }

    if (opt === this.faq) {
      return this.router.navigate([this.faq]);
    }

    if(!par.match(/.*home*/)){
      return location.href = "http://" + location.host + "/home#" + opt
    }

    if(opt == "login" || opt == "boleto"){
      return this.router.navigate(['login']);
    }
    return this.scroll(opt);
  }

  ngDoCheck() {

    this.currentRouter = window.location.href
    this.paramsUrl = this.currentRouter.split('=')
    this.rota = this.router.url;

    if (this.auth.isAdmin()) {
      this.headerNavOptions = [
       // { text: 'Sair', url: 'sair' },
      ];
    } else {
      if (this.auth.isAuthenticated()) {
        this.authenticated = true;

        this.headerNavOptions = [
          { text: 'Negociar via WhatsApp', url: 'whatsapp', icon:"business"},
          { text: 'Quem somos', url: 'sobre', icon:"business"},
          { text: 'Meus débitos', url: 'debt', icon:""},
          { text: 'Me ajuda', url: 'faq', icon:"" },
          { text: 'Sair', url: 'sair', icon:"" },
        ];
      } else {
        this.authenticated = false;

        this.headerNavOptions = [
          { text: 'Negociar via WhatsApp', url: 'whatsapp', icon:"business"},
          { text: 'Loja Virtual', url: 'lojavirtual', icon:""},
          { text: 'Ajuda', url: 'faq', icon:""},
          { text: 'Quem somos', url: 'sobre', icon:"business"}
        ];
      }
    }
  }

  public navigate(opt){
    if(opt == "whatsapp"){
      return window.open("https://api.whatsapp.com/send?phone=5511964392624&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
    }
    if(opt == "blog"){
      return window.open("https://blog.facaacordo.com.br")
    }
    return location.href = "http://" + location.host + "/home#" + opt
  }

  entrar() {
    return this.router.navigate(['login']);
  }
}
