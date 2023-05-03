import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyDebt } from 'src/app/pages/debt/providers/debt';
import { Plot } from 'src/app/shared/models/debtDetail';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import {GoogleAnalyticsService} from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  public paymentMethod = PaymentMethod;
  public paymentForm: FormGroup;
  public isSubmitted = false;
  public valorCartao: number;
  public diasEmAtraso: number;
  public imgCartao: boolean = true;
  public imgBoleto: boolean = true;
  public card:boolean = false;
  public teste: any = localStorage.getItem('optionPayBack');
  public opcaoBoleto: boolean = false;
  public parcela?: number;
  public demaisParcela: number;
  public valorEntrada: string;
  public valorDemais?: any;
  public dataVencimento: string;
  @Input() debt : CompanyDebt;
  @Input() hasErrorCC : boolean;
  @Input() optionPayBack: boolean;
  @Input() selectDebt: any;
  @Output() setPaymentOption = new EventEmitter();
  @Output() getPayment = new EventEmitter();
  @Output() filhinho = new EventEmitter();
  @Output() filhinho2 = new EventEmitter();
  @Output() voltarMetodoPagamento = new EventEmitter();
  @Output() hideOpcPagamento = new EventEmitter();

  selectedCard: any;
  constructor(
    private fb: FormBuilder,
    private gaAnalytics: GoogleAnalyticsService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Formas de pagamento",localStorage.getItem('cpf')).subscribe();
    this.selectCard(this.selectedCard)
    this.paymentForm = this.fb.group({
      paymentOption: new FormControl(null, [Validators.required])
    });
    this.paymentForm.controls.paymentOption.valueChanges.subscribe(
      (selectedValue) => {
        selectedValue == 'CREDIT_CARD' ? this.calculaValorCartao(this.debt.plotSelected) : this.valorCartao = null
      }
      );
    }

    ngOnChanges(){
      console.log('select numero => ' + this.selectDebt.numero)
      console.log('select entrada => ' + this.selectDebt.valorEntrada)
      console.log('select demais => ' + this.selectDebt.valorDemaisParcelas)
      console.log('select datavencimento => ' + this.selectDebt.dataVencimento)
      console.log('select debt => ' + JSON.stringify(this.selectDebt))

      //var i = JSON.parse(localStorage.getItem('parcelasNum'));

      this.parcela = this.selectDebt.numero;
      this.demaisParcela = this.parcela - 1;
      this.valorDemais = this.selectDebt.valorDemaisParcelas;
      this.valorEntrada = this.selectDebt.valorEntrada;
      this.dataVencimento = this.selectDebt.dataVencimento;

    if(this.hasErrorCC == true){
      this.isSubmitted = false; // para habilitar a seleçao de pagamento novamente, caso o cartão de erro e ele chame esse componente de novo
    }

    if(this.optionPayBack == false){
      this.imgBoleto = true;
      this.isSubmitted = false; // para habilitar a seleçao de pagamento novamente, caso o cartão de erro e ele chame esse componente de novo
    }
  }

  selectCard(i){
    if(i=='CREDIT_CARD'){
      this.card = true;
    }
  }

  //funcao para voltar no parcelamento
  opcParcelamento(i){
    //console.log('voltou para parcelamento')
    //envia evento para componente pai payment
    this.voltarMetodoPagamento.emit(i);
  }

  selectTicketMobile(i){
      this.hideOpcPagamento.emit(i);
      this.onSubmit();
  }

  selectTicket(i){
    if(this.paymentForm.value.paymentOption == 'CREDIT_CARD'){
      this.imgCartao = true;
      this.imgBoleto = false;
      this.onSubmit();
    } else if(this.paymentForm.value.paymentOption == 'TICKET'){
      this.opcaoBoleto = i;
      this.imgCartao = false;
      this.imgBoleto = true;
      this.isSubmitted = true; // para desabilitar a seleçao de pagamento novamente, caso o cartão de erro e ele chame esse componente de novo
    }
    if(this.paymentForm.value.paymentOption == 'TICKET' && i == false){
      this.imgBoleto = true;
      this.imgCartao = true;
      this.isSubmitted = false; // para habilitar a seleçao de pagamento novamente, caso o cartão de erro e ele chame esse componente de novo
    }
    if(this.paymentForm.value.paymentOption == 'CREDIT_CARD' && i == false){
      this.imgBoleto = true;
      this.imgCartao = true;
      this.isSubmitted = false; // para habilitar a seleçao de pagamento novamente, caso o cartão de erro e ele chame esse componente de novo
    }
  }

  calculaValorCartao(plotSelected: Plot) {
    this.valorCartao = (plotSelected.valorEntrada + (plotSelected.valorDemaisParcelas * (Number.parseInt(plotSelected.numero) - 1))) / Number.parseInt(plotSelected.numero)
  }
  public onSubmit() {
    this.selectedCard = this.paymentForm.value.paymentOption
    this.selectCard(this.selectedCard)
    this.optionPayBack == true;
    console.log(this.selectedCard)
    if (this.paymentForm.valid) {
      if(this.paymentForm.value.paymentOption == 'CREDIT_CARD'){
        this.imgCartao = true;
        this.imgBoleto = false;
      } else {
        this.imgBoleto = true;
        this.imgCartao = false;
        this.opcaoBoleto = false;
      }
      this.isSubmitted = true;
      this.setPaymentOption.emit(this.paymentForm.value.paymentOption);
      this.hasErrorCC = false;
      this.filhinho.emit(this.card);
      this.filhinho2.emit(true);
    }
  }

}
