import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtService } from '../../providers/debt.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TradingOption, Plot } from '../../providers/trading-option';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { Company, CompanyDebt, TradingDetails, UserDebtData } from "../../providers/debt";
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-debt-installment',
  templateUrl: './debt-installment.component.html',
  styleUrls: ['./debt-installment.component.scss']
})
export class DebtInstallmentComponent implements OnInit, OnChanges {

  @Input() debt: CompanyDebt;
  @Input() jocker: boolean;
  @Input() ocultaBtnVOrS: boolean;

  @Output() generateCCPlot = new EventEmitter();
  @Output() volta = new EventEmitter();
  @Output() backProfile = new EventEmitter();
  @Output() debtSelect = new EventEmitter();

  minDate = new Date();
  fontStyle?: string;
  startDate: string;
  fontStyleControl = new FormControl();
  // @Output() generateTicketPlot = new EventEmitter();
  radius: number;
  public tradingOptions: Plot[];
  public allTradingOptions: TradingDetails[];
  public paymentMethodForm: FormGroup;
  public paymentType = PaymentMethod;
  public submitted: boolean = false;
  public debtValue: number;
  public parcelaNum: number;
  public demaisParcelas: number;
  public valorEntrada: number;
  public dataVencimento: any;
  public telaAgendamento: boolean;
  public agendarData: boolean;
  public dataMaxima: any;
  public pontos: any;
  public dataAgendamento: string;
  public resp: any;
  public maxDate: any;
  public fort: number;
  public dataMaximas: number;
  public tipoNegociacao: string;
  public receb: number;
  public nameRota: string;
  public voltar: boolean = false;
  public valAtualizado: number;
  public quantidaDeParcelas: number;
  public typeSaldo: string;
  public debts: string = "Debit - (Quitação Parcial)";
  public invoicement: string = "Invoicement - (Parcelamento Parcial)";
  public acquittance: string = "Acquittance - (Quitação Total)";
  public agreement: string = "Agreement - (Parcelado)";

  constructor(
    private route: ActivatedRoute,
    private debtService: DebtService,
    private fb: FormBuilder,
    private loading: LoadingService,
    private gaAnalytics: GoogleAnalyticsService,
    private router: Router,
    public datepipe: DatePipe,
    private tools:Tools
  ) {
    this.paymentMethodForm = this.fb.group({
      installments: new FormControl(null, [Validators.required])
    }
    );
  }

  ngOnChanges() {
    this.debtValue = null;
    this.route.params.subscribe(data => {
      this.loading.setLoad();
    });
    this.typeSaldo = sessionStorage.getItem('typeSaldo')

    this.tradingOptions = this.filterPlots(this.debt.tradingOptions)
    //console.log("Opcoes de negociacao..:"+JSON.stringify(this.tradingOptions))
    this.quantidaDeParcelas = this.tradingOptions.length;
    this.allTradingOptions = this.debt.tradingOptions;
    this.loading.stopLoad();
    
  }

  ngOnInit() {
    this.radius = 11
     this.debt.dividas.filter(divida => {
      let valTipoNegociacao = sessionStorage.getItem('tipoNegociacao');
      if(divida.descricao == 'Saldo A Vencer'){
        if(valTipoNegociacao == 'All'){
          this.valAtualizado = divida.valorAtualizado + divida.valorAtualizado;
        } else {
          this.valAtualizado = divida.valorAtualizado ;
        }
      } else {
        this.valAtualizado = divida.valorAtualizado ;
      }
    })

    this.loading.acessoClient("Opcao de negociacao",localStorage.getItem('cpf')).subscribe();
    this.telaAgendamento = false;
    if(this.router.url == '/debt;company=12'){
      this.nameRota = "Negociação Riachuelo"
    }
    /**/
    this.tools.setTitle(this.nameRota);

    this.paymentMethodForm.controls.installments.valueChanges.subscribe(
      (selectedValue) => {
        this.debtValue = this.findValue(selectedValue) ? this.findValue(selectedValue).valorEntrada + (this.findValue(selectedValue).valorDemaisParcelas * (+this.findValue(selectedValue).numero - 1)) : 0;
        this.parcelaNum = this.findValue(selectedValue).numero;
        this.demaisParcelas = this.findValue(selectedValue).valorDemaisParcelas
        this.valorEntrada = this.findValue(selectedValue).valorEntrada
        let numpar = this.findValue(selectedValue).numero
        if(numpar == 1){
          this.tipoNegociacao = 'a vista'
        } else if(numpar > 1){
          this.tipoNegociacao = 'parcelado'
        }
        this.dataVencimento = this.debt.tradingOptions['0'].vencimentoPrimeira

        let dataV = new Date(this.dataVencimento)
        let dataVV = new Date(this.dataVencimento)

        /* Dia da semana */
        let j =  dataV.toLocaleString('pt-br', {  weekday: 'long' })

        if(j == 'sábado'){
          this.dataMaxima = dataV.setDate(dataV.getDate() + 13)
          this.dataMaximas = dataVV.setDate(dataVV.getDate() + 12)
        } else if(j == 'domingo'){
          this.dataMaxima = dataV.setDate(dataV.getDate() + 12)
          this.dataMaximas = dataVV.setDate(dataVV.getDate() + 11)
        } else {
          this.dataMaxima = dataV.setDate(dataV.getDate() + 11)
          this.dataMaximas = dataVV.setDate(dataVV.getDate() + 10)
        }

        /* consulta pontos */
        const subPontuacao = {
          next: (response) => {
            this.pontos = response.ponto;
          },
          complete: () => {
          },
          error: (err) => {
            this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
            this.loading.stopLoad();
            Swal.fire({
              title: '<html><p>' + 'Falha no Cálculo da PONTUAÇÃO' + '</p></html>',
              imageUrl: 'assets/img/warning.png'
            });

          }
        };
        this.debtService.postPontuacao(this.valorEntrada, 12).subscribe(subPontuacao);
        /* fim consulta pontos */

      }
    );
  }
  
  public backDebtProfile(){
    this.backProfile.emit(true)
  }

  public voltarVencidaEAvencer(){
    this.voltar = true;
    this.volta.emit(this.voltar)
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevenir Sabado e Domingo
    return day !== 0 && day !== 6;
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentMethodForm.valid) {
      this.debt.plotSelected = this.findValue(this.paymentMethodForm.value.installments);
      this.debt.tradingOptionSelected = this.findTrading(this.paymentMethodForm.value.installments)
      this.debtSelect.emit(this.debt.plotSelected)
      localStorage.setItem('pontos', this.pontos);
      localStorage.setItem('debt', JSON.stringify(this.debt));
      localStorage.setItem('vencimento', formatDate(this.debt.plotSelected.dataVencimento, 'dd/MM/yyyy', 'pt'));
      localStorage.setItem('parcelasNum', JSON.stringify(this.debt.plotSelected.numero));
      localStorage.setItem('valorDemais', JSON.stringify(this.debt.plotSelected.valorDemaisParcelas));
      localStorage.setItem('valorEntrada', JSON.stringify(this.debt.plotSelected.valorEntrada));
      this.generateCCPlot.emit(this.debt)
      this.gaAnalytics.eventEmitter('deal', 'parcelar', 'clickChoosePlot', parseInt(this.debt.plotSelected.numero, 10));
    }
  }

  private findValue(parcela) {
    let installment;
    this.tradingOptions.map(tradingOption => {
      if (!installment) {
        installment = this.tradingOptions.find(plot => plot === parcela);
      }
    });
    return !!installment ? installment : null;
  }

  private agendar(i){
    this.agendarData = i;
    this.dataAgendamento = this.datepipe.transform(this.startDate, 'yyyy/MM/dd');
    const teste = {
      next: (response) => {
            this.resp = response.mensagem;
            if(this.resp == "Sucesso"){
              this.loading.isLoading;
              this.router.navigate(['/debt/agendamento']);
            }
                  },
                  complete: () => {
                  },
                  error: (err) => {
                    this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
                    this.loading.stopLoad();
                    Swal.fire({
                      title: '<html><p>' + 'Selecione uma data para agendamento' + '</p></html>',
                      imageUrl: 'assets/img/warning.png'
                    });

                  }
    }
    if(this.demaisParcelas == null){
      this.receb = 0
    } else {
      this.receb = this.demaisParcelas
    }
    localStorage.setItem('VencimentoPromessaPagamento', formatDate(this.dataAgendamento, 'dd/MM/yyyy', 'pt'))
    this.debtService.postSendAgendamento(this.debt.idCon, this.dataAgendamento,1, this.parcelaNum, this.valorEntrada, this.receb, this.tipoNegociacao).subscribe(teste)
  }

  private agendamentoComponent(i){
    this.telaAgendamento = i;
  }

  private findTrading(parcela) {
    for (let tradingDetail of this.allTradingOptions) {
      for (let plot of tradingDetail.parcelas) {
        if (plot == parcela) {
          return tradingDetail;
        }
      }
    }
  }
  private filterPlots(debtValues: TradingDetails[]) {

    let plots: Plot[] = [];
    const plotTotal = debtValues.filter(res => this.typeSaldo == "SaldoTotal" && (res.descricaoFaixa == this.acquittance || res.descricaoFaixa == this.agreement) );
    const plotVencido = debtValues.filter(res => this.typeSaldo == "SaldoVencido" && (res.descricaoFaixa == this.debts || res.descricaoFaixa == this.invoicement) )

    if(plotTotal.length > 0){
      for (let option of plotTotal) {
        for (let plot of option.parcelas) {
            plots.push(plot);
        }
        
      }
    }
    if(plotVencido.length > 0){
      for (let option of plotVencido) {
        for (let plot of option.parcelas) {
            plots.push(plot);
        }
        
      }
    }
    return plots;
  }
}
