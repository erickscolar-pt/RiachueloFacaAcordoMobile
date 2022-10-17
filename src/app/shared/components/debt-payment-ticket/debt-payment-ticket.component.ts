import {Component, Input} from '@angular/core';
import {DealTicket} from '../../models/deal';
import {DebtService} from 'src/app/pages/debt/providers/debt.service';
import {LoadingService} from '../../providers/loading/loading.service';
import Swal from 'sweetalert2';
import {CompanyDebt, Data, SelectedDebt} from "../../../pages/debt/providers/debt";
import { Router } from '@angular/router';
import { PaymentMethod } from '../../models/payment-method.enum';

@Component({
  selector: 'app-debt-payment-ticket',
  templateUrl: './debt-payment-ticket.component.html',
  styleUrls: ['./debt-payment-ticket.component.scss']
})
export class DebtPaymentTicketComponent {
  @Input() public debt: CompanyDebt;


  public mailSent = false;
  public smsSent = false;
  public phone;
  public paymentMethod = PaymentMethod;

  constructor(
    private debtService: DebtService,
    private loading: LoadingService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    this.loading.acessoClient("Gerar boleto",localStorage.getItem('cpf')).subscribe();
  }

  public sendTicket() {
    this.loading.setLoad();
    let url = 'facaacordo';
    this.debtService.postSendMail(this.debt.idCon, null, this.debt.company.id, url)
      .subscribe({
        complete: () => {
          this.loading.stopLoad();
          this.mailSent = true;
          Swal.fire(
            'Sucesso!',
            'Boleto enviado para o e-mail cadastrado.',
            'success'
          ).then(() => {
            this.router.navigate(['/debt/success'], {queryParams: {paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos}});
        });
        },
        error: err => {
          this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
          this.loading.stopLoad();
          this.router.navigate(['/debt/warning'], { queryParams: { type: 'Ticket' }});
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
            this.router.navigate(['/debt/success'], {queryParams: {paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos}});
        });
        },
        error: err => {
          this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
          this.loading.stopLoad();
          this.router.navigate(['/debt/warning'], { queryParams: { type: 'Ticket' }});
        }
      });
  }

  public success() {
    setTimeout(() => {
       this.router.navigate(['/debt/success'], {queryParams: {paymentMethod: this.paymentMethod.TICKET, concts: this.debt.qtdContratos}});
    }, 3000);
}

}
