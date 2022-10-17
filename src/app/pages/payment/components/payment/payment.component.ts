import {Component, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {GoogleAnalyticsService} from 'src/app/shared/google-analytics/google-analytics.service';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import {CompanyDebt, SelectedDebt} from "../../../debt/providers/debt";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewChecked {
  public plotOption : boolean = false;
  public voltar: boolean = false;
  public ocultarBtn: boolean = true;
  public ocultarBtnOptionCard: boolean = true;
  public ocultaBtnVOrS: boolean;
  @Input() public debt: CompanyDebt;
  @Input() public hasErrorCC : boolean;
  @Input() public jocker : boolean;
  @Input() public isCardTrue : boolean;
  @Input() public checkMetedVenOrSal : boolean;
  @Output() generateCCPlot = new EventEmitter();
  @Output() generateTicketPlot = new EventEmitter();
  @Output() generatePixPlot = new EventEmitter();
  @Output() selectCreditCard = new EventEmitter();
  @Output() optionPayBack: boolean = true;
  public ocultaTela: boolean = false;
  public papai = false;
  public papai2 = false;
  public ocultaOpcBlt: boolean = false;

  constructor(
    private gaAnalytics: GoogleAnalyticsService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.ocultaBtnVOrS = this.checkMetedVenOrSal
    this.optionPayBack = true;
    this.ocultaTela = this.isCardTrue
  }

  ngOnChanges(){
    this.ocultaTela = this.isCardTrue
    this.optionPayBack = true;
  }

  public optionCardBack(){
    this.selectCreditCard.emit(false);
    this.plotOption = true;
    this.optionPayBack = false;
    this.ocultarBtn = true;
  }

  public getPaymentOption(event) {
    //console.log('evento => ' + event)

    if(event == 'TICKET'){
      this.ocultaOpcBlt = true;
    }

    this.debt.paymentOption = event;
    this.hasErrorCC = false;
    if(event == PaymentMethod.CREDITCARD){
      this.generateCCPlot.emit(this.debt);
      this.selectCreditCard.emit(true);
    } else if(event == PaymentMethod.TICKET){
      this.generateTicketPlot.emit(this.debt);
    } else {
      this.generatePixPlot.emit(this.debt);
    }
    this.ocultarBtn = false;
    this.ocultarBtnOptionCard = false;
  }

  public volta(event){
    console.log(event)
    this.ocultaTela = event
  }

  public getCCPlot(event) {
    this.debt = event;
    this.plotOption = true;
    this.voltar = true;
  //  this.generateCCPlot.emit(this.createDTO(event));
  }

  public voltarMetodoPagamento(event){
    console.log(event)
    if(event == true){

    this.selectCreditCard.emit(false);
    this.plotOption = false;
    this.optionPayBack = true;
    this.ocultarBtn = true;
      this.voltar = false;
      this.plotOption = false;
    } else if(event == false){
      this.voltar = true;
      this.plotOption = true;
    }

  }

  public trueOrFalse(event) {
    this.papai = event;
  }

  public trueOrFalse2(event) {
    this.papai2 = event;
    this.selectCreditCard.emit(this.papai2);
    this.plotOption = false;
    this.optionPayBack = true;
  }

  public getTicketPlot(event) {
  //  this.gaAnalytics.eventEmitter('payment', 'boleto', 'clickPayTicket', parseInt(this.idCon, 10));
   // this.generateTicketPlot.emit(this.createDTO(event));
  }

  /*public createDTO(plots) {
    let dto;
    if (this.promoCode) {
      dto = {
        plots,
        idServ: this.idServ,
        idCon: this.idCon,
        promoCode: this.promoCode
      };
    } else {
      dto = {
        plots,
        idServ: this.idServ,
        idCon: this.idCon,
      };
    }
    return dto;
  }*/

}
