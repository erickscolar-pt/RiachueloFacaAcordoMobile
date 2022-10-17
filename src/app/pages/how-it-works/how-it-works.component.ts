import {Component, OnInit} from '@angular/core';
import {HomeService} from 'src/app/shared/providers/home/home.service';
import {atmaImage, caeduImage, originalImage, midwayImage, menuImage} from 'src/app/shared/providers/background';
import { Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  public partners;
  public atmaImage = atmaImage;
  public caeduImage = caeduImage;
  public originalImage = originalImage;
  public midwayImage = midwayImage;
  public menuImage = menuImage;
  public partnersUniqueImage;
  public steps = [
    {
      url: './../../../assets/img/logos/home/busca_cpf_riachuelo_midway.png',
      title: 'Faça uma consulta<br> com seu CPF',
      text: 'Em poucos passos você faz uma busca rápida e vê se possui alguma restrição em seu nome. Tudo online e 24h por dia.',
      color: 'grey'
    },
    {
      url: './../../../assets/img/logos/home/faca_acordo_riachuelo.png',
      title: 'Escolha o <br>melhor acordo',
      text: 'Caso tenha um débito com a Riachuelo você tem a opção de fazer um acordo online, totalmente amigável. Sem telefonema, sem burocracia.',
      color: 'grey'
    },
    {
      url: './../../../assets/img/logos/home/pagamento_pague.png',
      title: 'Defina a forma<br> de pagamento',
      text: 'Após quitar sua dívida você recebera pontos e pode trocá-los por produtos na Pague Comprando',
      color: 'grey'
    },
    {
      url: './../../../assets/img/logos/home/consultar-acordo.png',
      title: 'Defina a forma<br> de pagamento',
      text: 'Você já possui um acordo? Aqui você pode consultar os dados do seu acordo e gerar a 2ª via de boleto',
      color: 'grey'
    }
  ];

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.homeService.getPartners().subscribe(data => {
      this.partners = data;
      this.partnersUniqueImage = [];
      this.partners.forEach(partner => {
        let imageExists = false;
        this.partnersUniqueImage.forEach(partner2 => {
          if (partner.urlImage === partner2.urlImage) {
            imageExists = true;

            return;
          }
        });

        if (!imageExists) {
          this.partnersUniqueImage.push(partner);
        }
      });
    });
  }

  entrar(){
    this.router.navigate(['/login'])
  }

  choose(partner : string){
    let carteira : string = '';
    switch(partner){
      case 'riachuelo':
        carteira = 'riachuelo.';
        break;
      case 'caedu':
        carteira = 'caedu.';
        break;
      case 'original':
          carteira = 'original.';
          break;
      default:
          carteira = '';
    }
    if(partner != 'facaacordo')
      window.open('https://' + carteira + 'facaacordo.com.br');
    else
      return this.router.navigate(["/warning"], {queryParams: {type: 'Redirect'}})
  }

}
