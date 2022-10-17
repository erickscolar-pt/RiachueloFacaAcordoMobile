import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Plot } from 'src/app/pages/debt/providers/trading-option';
import { PaymentService } from '../../providers/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DealDTO, IuguCCTransaction } from 'src/app/shared/models/deal';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import { Address } from 'src/app/shared/models/address';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { CompanyDebt, SaveDealDetail, SaveDealDTO, SelectedDebt } from "../../../debt/providers/debt";
import { HttpBackend, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { PrivacyPolicyComponent } from 'src/app/shared/components/privacy-policy/privacy-policy.component';

declare const Iugu: any;

@Component({
  selector: 'app-payment-credit-card',
  templateUrl: './payment-credit-card.component.html',
  styleUrls: ['./payment-credit-card.component.scss']
})
export class PaymentCreditCardComponent implements OnInit, OnChanges {
  public habiliteButton: boolean = true;
  private baseurl = environment.apiUrl;
  private http: HttpClient;
  public paymentMethod = PaymentMethod;
  public env = environment;
  public iuguCCTransaction: IuguCCTransaction;
  public paymentCreditCardForm: FormGroup;
  public submitted = false;
  public isTermsChecked = false;
  public fileToUpload: File = null;
  public submittedFile = null;
  public accept: any = 'image/jpeg,image/png,image/bmp,pdf/*';
  public deal: SaveDealDTO = {
    paymentOption: this.paymentMethod.CREDITCARD
  };

  @Input() public debt: CompanyDebt;
  @Output() errorCC = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private loading: LoadingService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private gaAnalytics: GoogleAnalyticsService,
    private handler: HttpBackend
  ) {

    this.http = new HttpClient(handler);

    this.route.params.subscribe(routeParams => {
      this.deal = {
        idCompany: +routeParams.company,
        paymentOption: this.paymentMethod.CREDITCARD
      };
    });
    this.paymentCreditCardForm = this.fb.group({
      number: new FormControl(null, [Validators.required]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      cardExpiry: new FormControl(null, [Validators.required]),
      verification_value: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      numero: new FormControl(null, [Validators.required]),
      logradouro: new FormControl(null, []),
      bairro: new FormControl(null, []),
      cidade: new FormControl(null, []),
      uf: new FormControl(null, [])
    });
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.loading.acessoClient("Formulario cartao",localStorage.getItem('cpf')).subscribe();
    let details: SaveDealDetail[] = []
    this.debt.typeNegociation == 'Parcial' ?
      this.debt.dividas.filter(divida => {
        if (divida.idTra.toString() == this.debt.idTraParcial) {
          let detail: SaveDealDetail = {}
          detail.divida = divida.descricao
          detail.contrato = divida.idTra.toString()
          details.push(detail)
        }
      }) : this.debt.dividas.filter(divida => {
        let detail: SaveDealDetail = {}
        detail.divida = divida.descricao
        detail.contrato = divida.idTra.toString()
        details.push(detail)

      })

    this.deal.idCon = this.debt.idCon;
    this.deal.url = "facaacordo";
    this.deal.cpf = localStorage.getItem('cpf')
    this.deal.typeNegociation = this.debt.typeNegociation
    this.deal.idTraParcial = this.debt.idTraParcial
    this.deal.parcela = this.debt.plotSelected
    this.deal.listDetails = details;
    this.deal.listInformacoes = this.debt.informacoes
    this.deal.opcaoNegociacaoNectar = this.debt.tradingOptionSelected;

    this.paymentCreditCardForm.get('cep').valueChanges.subscribe(cep => {
      if (cep.length === 8) {
        this.paymentService.getAddress(cep).subscribe((address: Address) => {
          this.paymentCreditCardForm.get('logradouro').setValue(address.logradouro);
          this.paymentCreditCardForm.get('bairro').setValue(address.bairro);
          this.paymentCreditCardForm.get('cidade').setValue(address.localidade);
          this.paymentCreditCardForm.get('uf').setValue(address.uf);
        });
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.gaAnalytics.eventEmitter('payment', 'cartao-de-credito', 'clickPayCC', this.debt.idCon);
    this.habiliteButton = false;
    this.loading.setLoad();
    if (this.paymentCreditCardForm.valid && this.isTermsChecked) {
      this.openSnackBar('Favor aguardar até o tempo para processar seu pagamento junto a administradora do seu cartão de crédito. Não feche seu navegador', 'Ok');
      this.deal.cep = this.paymentCreditCardForm.get('cep').value;
      this.deal.numero = this.paymentCreditCardForm.get('numero').value;
      this.paymentService.getAccountId()
        .subscribe(data => {
          const creditCard = this.getIuguToken(data.iuguKey, this.paymentCreditCardForm.value);
          Iugu.createPaymentToken(creditCard, response => {
            this.deal.clientKey = !response.errors ? response.id : null;
            if (this.deal.clientKey) {
              this.paymentService.postGenerateDeal(this.deal)
                .subscribe({
                  next: (deal) => {
                    this.iuguCCTransaction = deal;
                    this.habiliteButton = true;
                    this.loading.stopLoad();
                  },
                  error: (err) => {
                    this.loading.stopLoad();
                    this.loading.getErrorCounter(err).subscribe();
                    this.handleError(err);
                    this.habiliteButton = true
                  },
                  complete: () => {
                    this.loading.stopLoad();
                    if (this.iuguCCTransaction.success) {
                      this.router.navigate(['/debt/success'], { queryParams: { paymentMethod: this.paymentMethod.CREDITCARD, concts: this.debt.qtdContratos } });
                    } else {
                      Swal.fire({
                        type: 'error',
                        title: 'Ops...',
                        text: this.checkError(this.iuguCCTransaction.lr),
                      });
                      this.errorCC.emit("Error in credit card payment");
                    }
                    this.habiliteButton = true
                  }
                });
            } else {
              this.loading.stopLoad();
              this.habiliteButton = true;
              this.errorCC.emit("Error in credit card payment");
              Swal.fire({
                type: 'error',
                title: 'Ops...',
                text: 'Não foi possível processar o seu cartão, alguma informação está divergente.',
              });
            }
          });
        });
    } else {
      this.loading.stopLoad();
    }
  }

  public getIuguToken(key: string, cardForm: any) {
    Iugu.setAccountID(key);
    Iugu.setTestMode(this.env.iuguTestMode);
    Iugu.setup();
    let ccNumber = cardForm.number.replace(/\s/g, '');
    ccNumber = Iugu.utils.validateCreditCardNumber(ccNumber) ? ccNumber : null;
    const brand = Iugu.utils.getBrandByCreditCardNumber(ccNumber);
    const mm = cardForm.cardExpiry.substring(0, 2);
    const yyyy = cardForm.cardExpiry.substring(cardForm.cardExpiry.length - 2);
    const cvv = cardForm.verification_value;
    if (ccNumber && Iugu.utils.validateCVV(cvv, brand) && Iugu.utils.validateExpiration(mm, yyyy)) {
      return Iugu.CreditCard(ccNumber, mm, yyyy, cardForm.first_name, cardForm.last_name, cvv);
    }
  }

  public changeTerms(event) {
    this.isTermsChecked = event.checked;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '65%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  public openSnackBar(message: string, close: string) {
    this.snackBar.open(message, close, {
      duration: 5000,
    });
  }

  public checkError(erro: string): string {
    switch (erro) {
      case '00':
        return 'Transação autorizada com sucesso.';
      case '000':
        return 'Transação autorizada com sucesso.';
      case '01':
        return 'Transação não autorizada. Transação referida.';
      case '02':
        return 'Transação não autorizada. Transação referida.';
      case '03':
        return 'Transação não permitida. Erro no cadastramento do código do estabelecimento no arquivo de configuração do TEF';
      case '04':
        return 'Transação não autorizada. Cartão bloqueado pelo banco emissor.';
      case '05':
        return 'Transação não autorizada. Cartão inadimplente (Do not honor).';
      case '06':
        return 'Transação não autorizada.';
      case '07':
        return 'Transação negada. Reter cartão condição especial';
      case '08':
        return 'Transação não autorizada. Código de segurança inválido.';
      case '11':
        return 'Transação autorizada com sucesso para cartão emitido no exterior';
      case '12':
        return 'Transação inválida, erro no cartão.';
      case '13':
        return 'Transação não permitida. Valor da transação inválido.';
      case '14':
        return 'Transação não autorizada. Cartão Inválido';
      case '15':
        return 'Banco emissor indisponível ou inexistente.';
      case '19':
        return 'Refaça a transação ou tente novamente mais tarde.';
      case '21':
        return 'Cancelamento não efetuado. Transação não localizada.';
      case '22':
        return 'Parcelamento inválido. Número de parcelas inválidas.';
      case '23':
        return 'Transação não autorizada. Valor da prestação inválido.';
      case '24':
        return 'Quantidade de parcelas inválido.';
      case '25':
        return 'Pedido de autorização não enviou número do cartão';
      case '28':
        return 'Arquivo temporariamente indisponível.';
      case '30':
        return 'Transação não autorizada. Decline Message';
      case '39':
        return 'Transação não autorizada. Erro no banco emissor.';
      case '41':
        return 'Transação não autorizada. Cartão bloqueado por perda.';
      case '43':
        return 'Transação não autorizada. Cartão bloqueado por roubo.';
      case '51':
        return 'Transação não autorizada. Limite excedido/sem saldo.';
      case '52':
        return 'Cartão com dígito de controle inválido.';
      case '53':
        return 'Transação não permitida. Cartão poupança inválido';
      case '54':
        return 'Transação não autorizada. Cartão vencido';
      case '55':
        return 'Transação não autorizada. Senha inválida';
      case '57':
        return 'Transação não permitida para o cartão';
      case '58':
        return 'Transação não permitida. Opção de pagamento inválida.';
      case '59':
        return 'Transação não autorizada. Suspeita de fraude.';
      case '60':
        return 'Transação não autorizada.';
      case '61':
        return 'Banco emissor indisponível.';
      case '62':
        return 'Transação não autorizada. Cartão restrito para uso doméstico';
      case '63':
        return 'Transação não autorizada. Violação de segurança';
      case '64':
        return 'Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.';
      case '65':
        return 'Transação não autorizada. Excedida a quantidade de transações para o cartão.';
      case '67':
        return 'Transação não autorizada. Cartão bloqueado para compras hoje.';
      case '70':
        return 'Transação não autorizada. Limite excedido/sem saldo.';
      case '72':
        return 'Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.';
      case '74':
        return 'Transação não autorizada. A senha está vencida.';
      case '75':
        return 'Senha bloqueada. Excedeu tentativas de cartão.';
      case '76':
        return 'Cancelamento não efetuado. Banco emissor não localizou a transação original';
      case '77':
        return 'Cancelamento não efetuado. Não foi localizado a transação original';
      case '78':
        return 'Transação não autorizada. Cartão bloqueado primeiro uso.';
      case '80':
        return 'Transação não autorizada. Divergencia na data de transação/pagamento.';
      case '82':
        return 'Transação não autorizada. Cartão inválido.';
      case '83':
        return 'Transação não autorizada. Erro no controle de senhas';
      case '85':
        return 'Transação não permitida. Falha da operação.';
      case '86':
        return 'Transação não permitida. Falha da operação.';
      case '89':
        return 'Erro na transação.';
      case '90':
        return 'Transação não permitida. Falha da operação.';
      case '91':
        return 'Transação não autorizada. Banco emissor temporariamente indisponível.';
      case '92':
        return 'Transação não autorizada. Tempo de comunicação excedido.';
      case '93':
        return 'Transação não autorizada. Violação de regra - Possível erro no cadastro.';
      case '96':
        return 'Falha no processamento.';
      case '97':
        return 'Valor não permitido para essa transação.';
      case '98':
        return 'Sistema/comunicação indisponível.';
      case '99':
        return 'Sistema/comunicação indisponível.';
      case '999':
        return 'Sistema/comunicação indisponível.';
      case 'AA':
        return 'Tempo Excedido';
      case 'AC':
        return 'Transação não permitida. Cartão de débito sendo usado com crédito. Use a função débito.';
      case 'AE':
        return 'Tente Mais Tarde';
      case 'AF':
        return 'Transação não permitida. Falha da operação.';
      case 'AG':
        return 'Transação não permitida. Falha da operação.';
      case 'AH':
        return 'Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.';
      case 'AI':
        return 'Transação não autorizada. Autenticação não foi realizada.';
      case 'AJ':
        return 'Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label.';
      case 'AV':
        return 'Transação não autorizada. Dados Inválidos';
      case 'BD':
        return 'Transação não permitida. Falha da operação.';
      case 'BL':
        return 'Transação não autorizada. Limite diário excedido.';
      case 'BM':
        return 'Transação não autorizada. Cartão Inválido';
      case 'BN':
        return 'Transação não autorizada. Cartão ou conta bloqueado.';
      case 'BO':
        return 'Transação não permitida. Falha da operação.';
      case 'BP':
        return 'Transação não autorizada. Conta corrente inexistente.';
      case 'BV':
        return 'Transação não autorizada. Cartão vencido';
      case 'CF':
        return 'Transação não autorizada.C79:J79 Falha na validação dos dados.';
      case 'CG':
        return 'Transação não autorizada. Falha na validação dos dados.';
      case 'DA':
        return 'Transação não autorizada. Falha na validação dos dados.';
      case 'DF':
        return 'Transação não permitida. Falha no cartão ou cartão inválido.';
      case 'DM':
        return 'Transação não autorizada. Limite excedido/sem saldo.';
      case 'DQ':
        return 'Transação não autorizada. Falha na validação dos dados.';
      case 'DS':
        return 'Transação não permitida para o cartão';
      case 'EB':
        return 'Transação não autorizada. Limite diário excedido.';
      case 'EE':
        return 'Transação não permitida. Valor da parcela inferior ao mínimo permitido.';
      case 'EK':
        return 'Transação não permitida para o cartão';
      case 'FA':
        return 'Transação não autorizada.';
      case 'FC':
        return 'Transação não autorizada. Ligue Emissor';
      case 'FD':
        return 'Transação negada. Reter cartão condição especial';
      case 'FE':
        return 'Transação não autorizada. Divergencia na data de transação/pagamento.';
      case 'FF':
        return 'Cancelamento OK';
      case 'FG':
        return 'Transação não autorizada. Ligue AmEx.';
      // case 'FG':
      //   return 'Ligue 08007285090';
      case 'GA':
        return 'Aguarde Contato';
      case 'GD':
        return 'Transação não permitida.';
      case 'HJ':
        return 'Transação não permitida. Código da operação inválido.';
      case 'IA':
        return 'Transação não permitida. Indicador da operação inválido.';
      case 'JB':
        return 'Transação não permitida. Valor da operação inválido.';
      case 'KA':
        return 'Transação não permitida. Falha na validação dos dados.';
      case 'KB':
        return 'Transação não permitida. Selecionado a opção incorrente.';
      case 'KE':
        return 'Transação não autorizada. Falha na validação dos dados.';
      case 'N7':
        return 'Transação não autorizada. Código de segurança inválido.';
      case 'R1':
        return 'Transação não autorizada. Cartão inadimplente (Do not honor).';
      case 'U3':
        return 'Transação não permitida. Falha na validação dos dados.';
      default:
        return 'Transação negada.';
    }
  }
  handleError(err) {
    if (err.error.message.match(/.*tivemos um erro para salvar sua negociação*/)) {
        this.router.navigate(['/debt/warning'], { queryParams: { type: 'DealFail' } });
    }
    return;
}
}
