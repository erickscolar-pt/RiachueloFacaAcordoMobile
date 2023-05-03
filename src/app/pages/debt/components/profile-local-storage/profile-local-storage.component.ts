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
import { DebtProfileComponent } from '../debt-profile/debt-profile.component'

@Component({
  selector: 'app-profile-local-storage',
  templateUrl: './profile-local-storage.component.html',
  styleUrls: ['./profile-local-storage.component.scss']
})
export class ProfileLocalStorageComponent implements  OnChanges, AfterViewChecked {

    @Input() debt: CompanyDebt;
    @Output() getPayment = new EventEmitter();

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
    public i = DebtProfileComponent
  debtService: any;


    constructor(
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
      this.loading.stopLoad();
    }

    ngAfterViewChecked() {
      this.cdRef.detectChanges();
    }


    ngOnChanges() {
      if(this.debt.dividas){
        this.numeroContrato = this.debt.contrato
        this.diasEmAtraso = this.debt.informacoes.filter(info => { return info.descricao == 'Dias Enquadramento'})['0'].valor
        this.bandeira = this.debt.informacoes.filter(info => { return info.descricao == 'Bandeira'})['0'].valor
        this.valorComDesconto = this.calcularValorComDesconto(this.debt.tradingOptions)
        this.valorSemDesconto = this.calcularValorSemDesconto(this.debt.dividas)
        this.percentualDeDesconto = this.calcularPercentualDesconto(this.valorComDesconto, this.valorSemDesconto)
      }
       this.atrasoMenor360 = (this.diasEmAtraso < 350 && this.checaSaldoAVencer()) ? true : false;
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

    goToInstallments() {
      this.gaAnalytics.eventEmitter('deal', 'fazerAcordo', 'clickMakeDeal', this.diasEmAtraso);
      localStorage.setItem('Objeto1', JSON.stringify(this.debt.tradingOptions))
      if (this.debt.tradingOptions.length > 0) {
        this.getPayment.emit(this.debt);
        return;
      }
    }

    onSubmit(){
      this.loading.setLoad();
      let titulos = this.debtForm.controls.titulos.value == 'All' ? null : this.debtForm.controls.titulos.value
      this.debt.typeNegociation = this.debtForm.controls.titulos.value == 'All' ? NegociationType.TOTAL : NegociationType.PARCIAL;
      this.debt.idTraParcial = this.debtForm.controls.titulos.value == 'All' ? null : titulos;
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
          if (debtValues && !debtValues.isError) {
            this.debt.tradingOptions = debtValues as TradingDetails[];
            if(this.option == ''){
              this.option = this.debtForm.controls.titulos.value
              this.debt.jocker = false;
            } else if (this.option != this.debtForm.controls.titulos.value){
              this.option = this.debtForm.controls.titulos.value
              this.debt.jocker = !this.debt.jocker;
            } else {
              this.debt.jocker = false;
            }
            this.goToInstallments();
            sessionStorage.setItem('Objeto', JSON.stringify(this.debt.tradingOptions))
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
