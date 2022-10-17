import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CompanyDebt, Data, SelectedDebt} from '../../providers/debt';
import {DebtService} from '../../providers/debt.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoadingService} from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { DealTicket } from 'src/app/shared/models/deal';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-debt-deal',
  templateUrl: './debt-deal.component.html',
  styleUrls: ['./debt-deal.component.scss']
})
export class DebtDealComponent {

  @Input() public debt: CompanyDebt;
  @Output() public generateBankSlip = new EventEmitter();

  public ticket: DealTicket;
  public name: string;
  public dateNow:Date;
  public NetImage : String = "/assets/img/companies/cp1201.png";

  constructor(
    public debtService: DebtService,
    private sanitizer: DomSanitizer,
    private loading: LoadingService,
    private router: Router,
    private tools:Tools
  ) {
  }

  ngOnInit(){
    this.loading.acessoClient("Acordo ativo",localStorage.getItem('cpf')).subscribe();

    this.name = this.debtService.getName().replace("Sra ","").replace("Sr ","");
    this.loading.stopLoad();

    this.dateNow = new Date(Date.now());

  }

  private checkDateInDay( parcelvencimento: string): String {

    if(Date.parse(parcelvencimento) == new Date().setHours(0, 0, 0, 0))
    {

      return "1";

    }
    else if(Date.parse(parcelvencimento) > new Date().setHours(0, 0, 0, 0))
    {
      return "2";

    }else
    {
      return "0";
    }

  }

  public generateTicket() {
    const acordo = this.debt.acordo.filter(val => val.dataAcordo !== null).shift();
    if (!acordo) {
      Swal.fire(
        'Ops...',
        'Erro ao encontrar acordo.',
        'question'
      );

      return;
    }

    const parcela = acordo.acordoParcela.filter(val => val.dataPagemento === null).shift();
    if (!parcela) {
      Swal.fire(
        'Ops...',
        'Erro ao carregar parcelas.',
        'question'
      );

      return;
    }
    this.loading.setLoad();


    this.debtService.getTicket(parcela.idParcela, this.debt.idCon, parcela.dataVencimento.toString()).subscribe({
      next: boleto => {
        this.ticket = boleto;
      },
      complete: () => {
        const linkSource = 'data:application/pdf;base64,' + this.ticket.pdfBase64;
        this.ticket.fileName = `${this.debt.idCon}.pdf`;
        this.ticket.linkBoleto = this.sanitizer.bypassSecurityTrustUrl(linkSource);
        this.loading.stopLoad();
        this.debt.ticket = this.ticket;
        this.generateBankSlip.emit(this.debt);
      },
      error: err => {
        this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
        this.loading.stopLoad();
        this.router.navigate(['/debt/warning'], { queryParams: { type: 'Ticket' }});
      }
    });
  }
}
