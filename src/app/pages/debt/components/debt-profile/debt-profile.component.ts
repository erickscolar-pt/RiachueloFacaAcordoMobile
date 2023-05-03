import {Component, Input, Output, EventEmitter, OnChanges, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {CompanyDebt, Debt, Info, SelectedDebt, TradingDetails, TradingRequest} from '../../providers/debt';
import {faTags} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DebtService} from '../../providers/debt.service';
import Swal from 'sweetalert2';
import {GoogleAnalyticsService} from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { Plot } from 'src/app/shared/models/debtDetail';
import { NegociationType } from 'src/app/shared/models/negociation-type';
import { Router } from '@angular/router';
import { isObject } from 'util';

@Component({
  selector: 'app-debt-profile',
  templateUrl: './debt-profile.component.html',
  styleUrls: ['./debt-profile.component.scss']
})
export class DebtProfileComponent implements OnChanges, AfterViewChecked {
  @Input() debt: CompanyDebt;
  @Output() getPayment = new EventEmitter();
  @Output() validTrueCard = new EventEmitter();
  @Output() vencidaOrVencer = new EventEmitter();
  @Output() backMobile = new EventEmitter();


  //labelPosition: 'All' = 'All';

  public offerIcon = faTags;

  public valorSemDesconto: number;
  public valorComDesconto: number;
  public percentualDeDesconto: number;
  public valorAtualizado: number;
  public diasEmAtraso: number;
  public code = new FormControl('');
  public debtForm : FormGroup;
  public numeroContrato;
  public bandeira: string;
  public atrasoMenor360 : boolean;
  public dividaVencida : Debt;
  public request: TradingRequest = {};
  public option: string = '';
  public optionLocalStorage ;
  public SaldoTotal: any;
  public SaldoVencido: any;
  public valueDebt: boolean;
  public isVencidaOrVencer: boolean;
  public vencido: any;
  public total: any;

  constructor(
    private debtService: DebtService,
    private gaAnalytics: GoogleAnalyticsService,
    private cdRef: ChangeDetectorRef,
    private loading : LoadingService,
    private formBuilder : FormBuilder,
    private router: Router
  ) {
    this.debtForm = this.formBuilder.group({
      titulos: new FormControl(null)
    })
  }

  ngOnInit(){
    this.loading.acessoClient("Resumo da divida",localStorage.getItem('cpf')).subscribe();
    this.backMobile.emit(true)

    if(this.checaSaldoAVencer()){
      // envia para debt pai se ele é true ou false
      this.vencidaOrVencer.emit(true)
      this.isVencidaOrVencer = true
    } else {
      // envia para debt pai se ele é true ou false
      this.vencidaOrVencer.emit(false)
      this.isVencidaOrVencer = false
    }
    this.loading.stopLoad();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }


  ngOnChanges() {
    //console.log("Dividas...:"+JSON.stringify(this.debt))
    if(this.debt.dividas){
      this.numeroContrato = this.debt.contrato
      this.diasEmAtraso = this.debt.informacoes.filter(info => { return info.descricao == 'Dias Enquadramento'})['0'].valor
      this.bandeira = this.debt.informacoes.filter(info => { return info.descricao == 'Bandeira'})['0'].valor
      this.valorComDesconto = this.calcularValorComDesconto(this.debt.tradingOptions)
      this.valorSemDesconto = this.calcularValorSemDesconto(this.debt.dividas)
      this.percentualDeDesconto = this.calcularPercentualDesconto(this.valorComDesconto, this.valorSemDesconto)
      this.vencido = this.debt.dividas[0].descricao == 'Saldo A Vencer' ? '' : this.debt.dividas[0].valorAtualizado;
      this.total = this.debt.dividas[0].descricao != 'Saldo A Vencer' ? this.debt.dividas[0].valorAtualizado + this.debt.dividas[1].valorAtualizado : '';
    }
     this.atrasoMenor360 = (this.diasEmAtraso < 360 && this.checaSaldoAVencer()) ? true : false;
     if(this.atrasoMenor360){
       this.defineDividaVencida();
     }

  }

  calcularValorComDesconto(opc : TradingDetails[]){
    let valor: number = 0;
    if(opc != null){
      for(let trading of opc){
        for(let opcao of trading.parcelas){
          if(opcao.numero == "1"){
            valor = opcao.valorEntrada
          }
        }
      }
    }
    return valor;
  }
  calcularValorSemDesconto(dividas : Debt[]){
    let valor: number = 0;
    for(let divida of dividas){
      valor += divida.valorAtualizado;
    }
    return valor;
  }
  calcularPercentualDesconto(valorComDesconto : number, valorSemDesconto : number){
    return 1 -(valorComDesconto  / valorSemDesconto);
  }

  defineDividaVencida(){
    this.dividaVencida = this.debt.dividas.filter(divida => { return divida.descricao != "Saldo A Vencer"})['0']
  }

  checaSaldoAVencer(){
    for(let divida of this.debt.dividas){
      if(divida.descricao == 'Saldo A Vencer'){
        return true;
      }
    }
    return false;
  }

  goToInstallmentsMobile(val){
    this.backMobile.emit(false)
    this.goToInstallments(val)
  }

  goToInstallments(val) {
    console.log(JSON.stringify(this.debt))
    this.gaAnalytics.eventEmitter('deal', 'fazerAcordo', 'clickMakeDeal', this.diasEmAtraso);
    localStorage.setItem('percentualDesconto', String(this.percentualDeDesconto))

    var session;

    if (val == 'All' && this.SaldoTotal === null && this.isVencidaOrVencer == true){
      sessionStorage.setItem('SaldoTotal', JSON.stringify(this.debt))
      sessionStorage.setItem('SaldoTotalEnv', "SaldoTotalEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoTotal")


      session = this.debt

    } else if (this.SaldoVencido === null && this.isVencidaOrVencer == true){

      sessionStorage.setItem('SaldoVencido', JSON.stringify(this.debt))
      sessionStorage.setItem('SaldoVencidoEnv', "SaldoVencidoEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoVencido")


      session = this.debt

    } else if(val == 'All' && this.SaldoTotal !== null && this.isVencidaOrVencer == true){

      session = JSON.parse(sessionStorage.getItem('SaldoTotal'))
      sessionStorage.setItem('SaldoTotalEnv', "SaldoTotalEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoTotal")
      
    } else if(val !== 'All' && this.SaldoVencido !== null && this.isVencidaOrVencer == true){

      session = JSON.parse(sessionStorage.getItem('SaldoVencido'))
      sessionStorage.setItem('SaldoTotalEnv', "SaldoTotalEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoVencido")

    }else if(this.isVencidaOrVencer == false && val == 'All'){
      sessionStorage.setItem('SaldoTotal', JSON.stringify(this.debt))
      sessionStorage.setItem('SaldoTotalEnv', "SaldoTotalEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoTotal")

      session = this.debt
    } else if(this.isVencidaOrVencer == false && val == 'All'){
      session = JSON.parse(sessionStorage.getItem('SaldoTotal'))
      sessionStorage.setItem('SaldoTotalEnv', "SaldoTotalEnviado")
      sessionStorage.setItem('typeSaldo', "SaldoTotal")
    }
    /*  else if(this.isVencidaOrVencer == false && val == 'All'){

      session = this.debt

    } */

    this.validTrueCard.emit(false)
    this.getPayment.emit(session);
    return;

  }

  selectOptionVencidoAndAVencerMobile(val){
    //console.log(val)
    this.backMobile.emit(false)
    sessionStorage.setItem('tipoNegociacao',val)
    this.selectOptionVencidoAndAVencer(val)
  }

  selectOptionVencidoAndAVencer(i){

    //console.log(i)
    this.SaldoVencido = sessionStorage.getItem('SaldoVencidoEnv');
    this.SaldoTotal  = sessionStorage.getItem('SaldoTotalEnv');

    if( i == 'All' && this.SaldoTotal === "SaldoTotalEnviado"){

      this.valueDebt = false
      //this.backMobile.emit(false)
      this.goToInstallments(i);

    } else if( i != 'All' && this.SaldoVencido === "SaldoVencidoEnviado" ){

      this.valueDebt = false
      //this.backMobile.emit(false)
      this.goToInstallments(i);

    } else {

    this.valueDebt = true

    this.loading.setLoad();
    /* this.debtForm.controls.titulos.value */
    let titulos = i == 'All' ? null : i
    this.debt.typeNegociation = i == 'All' ? NegociationType.TOTAL : NegociationType.PARCIAL;
    this.debt.idTraParcial = i == 'All' ? null : titulos;
    this.request.idCompany = "12";
    this.request.idCon = this.debt.idCon.toString();
    this.request.document = this.debt.informacoes.filter(info => { return info.descricao == 'Bandeira'})['0'].valor
    this.request.titulos = titulos;
    if (this.request.document == 'Empréstimo Pessoal' || this.request.document == 'Saque Fácil') {
      var saldoMinimo = (this.debt.informacoes.filter(info => { return info.descricao == 'Saldo' })['0'].valor * 0.15)
      this.request.saldoMinimo = saldoMinimo < 70 ? "70" : saldoMinimo.toString()
    }
    this.debtService.getAllDebtValues(this.request)
    .subscribe({
      next: debtValues => {
        this.loading.stopLoad();
        this.backMobile.emit(false)
        if (debtValues && !debtValues.isError) {
          this.debt.tradingOptions = debtValues as TradingDetails[];
          if(this.option == ''){
            this.option = i
            this.debt.jocker = false;
          } else if (this.option != i){
            this.option = i
            this.debt.jocker = !this.debt.jocker;
          } else {
            this.debt.jocker = false;
          }
          this.goToInstallments(i);
        } else {
          this.loading.stopLoad();
          this.handleError(debtValues.error);
        }

      },
      error: err => {
        this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
      }
    });
  }
  }

  handleError(err) {
    if (!err.error.message.match(/.*Estamos passando por uma atualização*/)) {
      if (err.error.message.match(/.*Não encontramos em nossa base dívidas*/)) {
        this.router.navigate(['/debt/warning'], { queryParams: { type: 'NotFound' }});
      } else {
        this.router.navigate(['/debt/warning'], { queryParams: { type: 'Redirect' }});
      }
      return;
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/home']);
      return;
    }
  }
}
