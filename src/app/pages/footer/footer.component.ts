import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { MailFormComponent } from 'src/app/shared/mail-form/components/mail-form/mail-form.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  public footers = [
    {
      link: 'https://www.linkedin.com/company/fa%C3%A7a-acordo',
      img: './../../../assets/img/linkedin.png',
      text: '/company/facaacordo'
    },
    {
      link: 'https://www.facebook.com/facaacordo',
      img: './../../../assets/img/facebook.png',
      text: '/facaacordo'
    },
    {
      link: 'https://www.instagram.com/faca_acordo/',
      img: './../../../assets/img/instagram.png',
      text: '@facacordo'
    },
    {
      link: 'https://www.youtube.com/channel/UCNttnAoUmlvkZhC9M0SfJWw/?guided_help_flow=5',
      img: './../../../assets/img/youtube.png',
      text: 'Faça Acordo'
    },
    {
      link: "https://api.whatsapp.com/send?phone=5511964392624&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato",
      img: './../../../assets/img/whats.png',
      text: 'Faça Acordo'
    }
  ];

  public linkClientes = [
    {
      link: "Sua área",
      url: "login"
    },
    {
      link: "Blog da Faça",
      url: "blog"
    },
    {
      link: "Por que a Faça Acordo?",
      url: "howItWorks"
    },
    {
      link: "Política de Privacidade",
      url: "politica"
    }
  ]

  public linkNegociacoes = [
    {
      link: "Consultar CPF",
      url: "home"
    },
    {
      link: "Segunda via do boleto",
      url: "login"
    },
    {
      link: "Negociar pelo WhatsApp",
      url: "whatsapp"
    }
  ]

  public linkFales = [
   /* {
      link: "Central de Relacionamento",
      url: "whatsapp"
    },*/
    {
      link: "Enviar email",
      url: "email"
    }
  ]

  public linkAjudas = [
    {
      link: "Como negociar?",
      url: "howItWorks"
    },
   /* {
      link: "Dúvidas frequentes",
      url: "ajuda"
    }*/
  ]

  public linkSobres = [
    {
      link: "Quem somos?",
      url: "sobre"
    }
  ]

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private gaAnalytics: GoogleAnalyticsService,
  ) { }

  ngOnInit() {
  }

  public opt(opt) {

    if(opt == "politica"){
      return this.openDialog()
    }

    if(opt == "email"){
      return this.openMailForm()
    }

    if(opt == "login"){
      return this.router.navigate(['login']);
    }
    if(opt == "whatsapp"){
      return window.open("https://api.whatsapp.com/send?phone=5511964392624&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
    }
    if(opt == "blog"){
      return window.open("https://www.blog.facaacordo.com.br/")
    }

    return this.scroll(opt);
  }

  public scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TermosComponent, {
      width: '65%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openMailForm() {
    this.gaAnalytics.eventEmitter('widget', 'mailOpen', 'openMailForm');
    const dialogRef = this.dialog.open(MailFormComponent, {
      width: '65%',
      data: null,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gaAnalytics.eventEmitter('widget', 'mailClose', 'closeMailForm');
      //console.log(result);
    });
  }

}
