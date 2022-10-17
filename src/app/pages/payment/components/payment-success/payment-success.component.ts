import { Component, OnInit } from '@angular/core';
import { DebtService } from 'src/app/pages/debt/providers/debt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import { background, loggedBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';
import { Tools } from 'src/app/shared/tools';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  public name: string;
  public paymentMethod = PaymentMethod;
  public paymentOption: PaymentMethod;
  public readonly bg = loggedBg;
  public readonly bgMobile = mobileDefault;
  public bgAlt = homeAlt;
  public hasContracts: boolean = false;
  public pontos: any;
  public valorEntrada: any;
  public valorDemais: any;
  public parelaNum: Number;
  public dataVencimento: any;
  public parcOrAvista: string;
  public percentualDesconto: string;
  public nameRota: string;
  constructor(
    private debtService: DebtService,
    private route: ActivatedRoute,
    private router: Router,
    private tools:Tools,
    private loading: LoadingService

  ) {
    this.route.queryParams.subscribe(queryParams => {
      this.paymentOption = queryParams.paymentMethod;
    });
  }

  ngOnInit() {
    this.loading.acessoClient("Resumo do acordo 2",localStorage.getItem('cpf')).subscribe();

    if(this.router.url == '/debt/success?paymentMethod=TICKET&concts=2'){
      this.nameRota = "Negociação Riachuelo com Sucesso"
    } else if(this.router.url == '/debt/success?paymentMethod=TICKET&concts=1'){
      this.nameRota = "Negociação Riachuelo com Sucesso"
    }
    this.tools.setTitle(this.nameRota);


    this.name = this.debtService.getName();
    const par = this.router.url.split('=')[2] //se tiver mais de um contrato, libera botão pra voltar pros débitos
    par != "1" ? this.hasContracts = true : this.hasContracts = false

    this.pontos = localStorage.getItem('pontos');
    this.valorDemais = localStorage.getItem('valorDemais');
    this.valorEntrada = localStorage.getItem('valorEntrada');
    this.dataVencimento = localStorage.getItem('vencimento');
    this.percentualDesconto = localStorage.getItem('percentualDesconto');
    var i = localStorage.getItem('parcelasNum');
    var x: number = +i;
    this.parelaNum = x;
    if(this.parelaNum>1){
        this.parcOrAvista = "Parcelado"
    } else {
        this.parcOrAvista = "À vista"
    }
  }
  refresh(){
    this.router.navigate(['/debt']);
  }

}
