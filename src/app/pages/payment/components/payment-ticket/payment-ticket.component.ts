import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Plot } from 'src/app/pages/debt/providers/trading-option';
import { DealDTO, DealTicket } from 'src/app/shared/models/deal';
import { PaymentService } from '../../providers/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { DebtService } from 'src/app/pages/debt/providers/debt.service';
import { CompanyDebt, SaveDealDetail, SaveDealDTO, SelectedDebt } from "../../../debt/providers/debt";
import { Payment } from 'src/app/shared/providers/user/user';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';

@Component({
    selector: 'app-payment-ticket',
    templateUrl: './payment-ticket.component.html',
    styleUrls: ['./payment-ticket.component.scss']
})
export class PaymentTicketComponent implements OnInit, OnChanges {
    @Input() public debt: CompanyDebt;
    public paymentMethod = PaymentMethod;
    public ticket: DealTicket;
    public mailSent = false;
    public smsSent = false;
    public phone;
    public pontos: any;
    public valorEntrada: any;
    public valorDemais: any;
    public parelaNum: Number;
    public dataVencimento: any;
    public parcOrAvista: string;
    public loadAfter: boolean = true;
    public deal: SaveDealDTO = {
        paymentOption: this.paymentMethod.TICKET
    };

    constructor(
        private paymentService: PaymentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private router: Router,
        private loading: LoadingService,
        private debtService: DebtService,
    ) {
        this.route.params.subscribe(routeParams => {
            this.deal = {
                idCompany: +routeParams.company,
                paymentOption: this.paymentMethod.TICKET
            };
        });
    }

    ngOnChanges() {
    }

    ngOnInit() {

        this.loadAfter = true;
        let details: SaveDealDetail[] = []

        this.loading.acessoClient("Resumo do acordo",localStorage.getItem('cpf')).subscribe();


        this.pontos = localStorage.getItem('pontos');
        this.valorDemais = localStorage.getItem('valorDemais');
        this.valorEntrada = localStorage.getItem('valorEntrada');
        this.dataVencimento = localStorage.getItem('vencimento');
        var i = localStorage.getItem('parcelasNum');
        var x: number = +i;
        this.parelaNum = x;
        if(this.parelaNum>1){
            this.parcOrAvista = "Parcelado"
        } else {
            this.parcOrAvista = "À vista"
        }
        this.loadAfter = true;
        
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
            this.paymentService.postGenerateDeal(this.deal)
            .subscribe({
                next: boleto => {
                    this.ticket = boleto;
                    const linkSource = 'data:application/pdf;base64,' + this.ticket.pdfBase64;
                    this.ticket.fileName = `${this.debt.idCon}.pdf`;
                    this.ticket.linkBoleto = this.sanitizer.bypassSecurityTrustUrl(linkSource);
                },
                error: err => {
                    this.router.navigate(['/debt']);
                    this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
                    this.handleError(err);
                    this.loadAfter = false;
                }
            });
            this.loadAfter = false;
        }
        
        sendTicket() {

        this.loading.setLoad();
        let url = 'facaacordo';
        this.debtService.postSendMail(this.debt.idCon, null, this.deal.idCompany, url)
            .subscribe({
                complete: () => {
                    this.loading.stopLoad();
                    this.mailSent = true;
                    Swal.fire(
                        'Sucesso!',
                        'Boleto enviado para o e-mail cadastrado.',
                        'success'
                    ).then(() => {
                        this.router.navigate(['/debt/success'], { queryParams: { paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos } });
                    });
                },
                error: err => {
                  this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
                  this.loading.stopLoad();
                }
            });
    }

    sendSMS() {
        this.loading.setLoad();
        this.debtService.postSendSMS(this.debt.idCon, this.phone ? this.phone : null, this.debt.company.id)
            .subscribe({
                complete: () => {
                    this.loading.stopLoad();
                    this.smsSent = true;
                    Swal.fire(
                        'Sucesso!',
                        'SMS enviado com sucesso.',
                        'success'
                    ).then(() => {
                        this.router.navigate(['/debt/success'], { queryParams: { paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos }});
                    });
                },
                error: err => {
                  this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
                  this.loading.stopLoad();
                }
            });
    }

    copyInputMessage(inputElement) {
        //console.log(inputElement)
/*       inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0); */

      var linhaDigitavel = document.createElement("textarea");

      linhaDigitavel.value = inputElement;

      document.body.appendChild(linhaDigitavel);
      linhaDigitavel.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch(err){
        console.log('Oops, unable to copy');
        window.prompt("Copie para área de transferência: Ctrl+C e tecle Enter", inputElement);
      }

      document.body.removeChild(linhaDigitavel);

    }

    public success() {
        setTimeout(() => {
            this.router.navigate(['/debt/success'], { queryParams: { paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos }});
        }, 3000);
    }

    handleError(err) {
        if (err.error.message.match(/.*tivemos um erro para salvar sua negociação*/)) {
            this.router.navigate(['/debt/warning'], { queryParams: { type: 'DealFail' } });
        }
        return;
    }
}
