import {Component, OnChanges, Input, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Company, CompanyDebt, Deal, DebtDealCodes, Info, SelectedDebt} from '../../providers/debt';
import {ActivatedRoute, Router} from '@angular/router';
import {loggedBg, mobileDefault, homeAlt} from 'src/app/shared/providers/background';
import {Plot} from "../../../../shared/models/debtDetail";
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})
export class DebtComponent implements OnChanges, AfterViewChecked {

  @Input() public company: CompanyDebt;
  @Input() public debtValues: any[];

  public readonly bg = loggedBg;
  public readonly bgMobile = mobileDefault;
  public readonly bgAlt = homeAlt;

  public isPayment: boolean = false;
  public isTicket: boolean = false;
  public isCC: boolean = false;
  public isPix: boolean = false;
  public hasDeal: boolean = false;
  public hasTicket: boolean = false;
  public hasErrorCC: boolean = false;
  public backCard:boolean;
  public isCardTrue: boolean;
  public venOrSaldoTotal: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private loading: LoadingService
  ) {
  }
  ngOnInit(){
  }
  ngOnChanges(){
    this.hasDeal = this.hasDeals(this.company.acordo)
  }
  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }
  hasDeals(acordo : Deal[]) : boolean{
    return acordo.length > 0 ? true : false;
  }

  vencidaOrVencer(event){
    if(event == true){
      this.venOrSaldoTotal = true
    } else {
      this.venOrSaldoTotal = false;
    }
  }

  changeTradingOptions(debt : CompanyDebt){
    this.company = debt;
    this.isPayment = true;
  }

  validTrueCard(event){
    this.isCardTrue = event;
  }

  generateCCPlot(event){
    this.hasErrorCC = false;
    this.company = event;
    this.isCC = true;
  }

  creditCardSelect(event){
    this.backCard = event;
  }

  generateTicketPlot(event){
    this.hasErrorCC = false;
    this.company = event;
    this.isTicket = true;
  }
  generatePixPlot(event){
    this.hasErrorCC = false;
    this.company = event;
    this.isPix = true;
  }
  checkIfIsBankSlip(event){
    this.company = event;
    this.hasTicket = true;
  }
  checkErrorCC(event){
    this.hasErrorCC = true;
  }
 }
