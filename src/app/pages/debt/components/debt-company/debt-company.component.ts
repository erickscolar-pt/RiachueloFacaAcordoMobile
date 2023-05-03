import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyDebt, Info, TradingDetails, TradingRequest } from '../../providers/debt';
import { DebtService } from '../../providers/debt.service';
import { loggedBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import Swal from 'sweetalert2';
import { DebtDetail, Plot } from 'src/app/shared/models/debtDetail';
import { NegociationType } from 'src/app/shared/models/negociation-type';
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-debt-company',
  templateUrl: './debt-company.component.html',
  styleUrls: ['./debt-company.component.scss']
})
export class DebtCompanyComponent implements OnInit {
  public userDebtData: any;
  public selectedCompany: CompanyDebt;
  public readonly bg = loggedBg;
  public readonly bgMobile = mobileDefault;
  public company;
  public bgAlt = homeAlt;
  public debtValues: DebtDetail[];
  public numerosPorExtenso;
  public request: TradingRequest = {}
  public debts: CompanyDebt[] = null;
  public temSaldoAVencer: boolean = false;
  public temAcordo: boolean = false;
  public load: boolean =  true;
  public nameRota: string;

  constructor(
    private debtService: DebtService,
    private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService,
    private gaAnalytics: GoogleAnalyticsService,
    private tools:Tools
  ) {
  }

  chooseCompany(company) {
    this.loading.setLoad()
    this.selectedCompany = company as CompanyDebt;
    this.selectedCompany.qtdContratos = this.debts != null ? this.debts.length : 1
    this.gaAnalytics.eventEmitter('debt', 'company', this.selectedCompany.agrupamento);
    this.checkIfHasDeal(company);
    let atraso: Info[] = this.selectedCompany.informacoes.filter(info => { return info.descricao == 'Dias Enquadramento' })
    for (let divida of this.selectedCompany.dividas) {
      if (divida.descricao == 'Saldo A Vencer') {
        this.temSaldoAVencer = true;
      }
    }
    if ((atraso['0'].valor < 360 && this.temSaldoAVencer) || this.temAcordo) {
      this.loading.stopLoad();
      this.router.navigate(['/debt', { company: this.selectedCompany.company.id }], { relativeTo: this.route.parent });

    } else {
      this.selectedCompany.typeNegociation = NegociationType.TOTAL;
      this.request.idCompany = "12";
      this.request.idCon = this.selectedCompany.idCon.toString()
      this.request.document = this.selectedCompany.informacoes.filter(info => { return info.descricao == 'Bandeira' })['0'].valor

      if (this.request.document == 'Empréstimo Pessoal' || this.request.document == 'Saque Fácil') {
        var saldoMinimo = (this.selectedCompany.informacoes.filter(info => { return info.descricao == 'Saldo' })['0'].valor * 0.15)
        this.request.saldoMinimo = saldoMinimo < 70 ? "70" : saldoMinimo.toString()
      }
      this.debtService.getAllDebtValues(this.request)
        .subscribe({
          next: debtValues => {
            this.loading.stopLoad();
            if (debtValues && !debtValues.isError) {
              this.debtValues = debtValues;
              this.selectedCompany.tradingOptions = debtValues as TradingDetails[];
              this.router.navigate(['/debt', { company: this.selectedCompany.company.id }], { relativeTo: this.route.parent });
            } else if(debtValues.isError){
              this.loading.stopLoad();
              this.load = false;
              this.handleError(debtValues.error);
            }
          },
          error: err => {
            this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
          },
          complete: () => {
          }
        });
    }
  }

  ngOnInit() {
    this.loading.acessoClient("Contratos ativos",localStorage.getItem('cpf')).subscribe();

    if(this.router.url == '/debt'){
      this.nameRota = "Meus Débitos Riachuelo"
    }
    if(this.router.url == '/debt;company=12'){
      this.nameRota = "Negociação Riachuelo"
    }
    this.tools.setTitle(this.nameRota);


    this.route.params.subscribe(data => {
      /* true */
      //this.loading.setLoad();
      if (data.company && this.selectedCompany === undefined) {
        this.load = true;
        this.router.navigate(['/debt']);
        return;
      }
      this.company = data.company;
    });
    this.debtService.getDebt().subscribe({
      next: debt => {
        let contratos: CompanyDebt[] = debt['contratoNectar']
        this.defineInformacoes(contratos)
        /* false */
        ////this.loading.stopLoad();
        this.load = false;
        this.debtService.postName(debt.nomeCliente);
        if (contratos.length > 0) {
          this.debts = contratos;
        } else {
          if (contratos['0'].company.id == 12 || contratos['0'].company.id == 7 || contratos['0'].company.id == 6) {
            this.userDebtData = debt;
            this.chooseCompany(contratos['0']);
          }
        }
        if (contratos == null || contratos.length == 0) {
          this.router.navigate(['/debt/warning']);
        }
      },
      error: err => {
        this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
        this.loading.stopLoad();
        this.handleError(err);
      },
      complete: () => {
      }
    });
  }

  defineInformacoes(company: CompanyDebt[]) {
    for (let contrato of company) {
      for (let informacao of contrato.informacoes) {
        if (informacao.descricao == 'Bandeira') {
          switch (informacao.valor) {
            case 'PL':
            case 'Cartão Pl':
              informacao.valor = 'Cartão Private Label'
              break;
            case 'Bandeira':
            case 'BANDEIRA':
              informacao.valor = 'Cartão Bandeirado'
              break;
            case 'Saque Facil':
              informacao.valor = 'Saque Fácil'
              break;
            case 'Emprestimo Pessoal':
              informacao.valor = 'Empréstimo Pessoal'
              break;
          }
        } else {
          informacao.valor = informacao.valor
        }
      }
    }
  }
  checkIfHasDeal(company: CompanyDebt) {
    if (company.acordo.length > 0) {
      this.temAcordo = true;
    }
  }

  handleError(err) {
    if (!err.error.message.match(/.*Estamos passando por uma atualização*/)) {
      if (err.error.message.match(/.*Não encontramos em nossa base dívidas*/)) {
        this.router.navigate(['/debt/warning'], { queryParams: { type: 'NotFound' }});
      } else if(err.error.message.match(/.*Você já tem*/)){
        this.router.navigate(['debt/warning'], { queryParams: { type: 'Loading'}});
      }
      else {
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
