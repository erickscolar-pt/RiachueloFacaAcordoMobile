import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plot} from 'src/app/pages/debt/providers/trading-option';
import {SelectedDebt} from "../../../debt/providers/debt";

@Component({
  selector: 'app-payment-credit-card-warning',
  templateUrl: './payment-credit-card-warning.component.html',
  styleUrls: ['./payment-credit-card-warning.component.scss']
})
export class PaymentCreditCardWarningComponent {
  @Input() private plot: Plot;
  @Input() private idCon: number;
  @Input() private idServ: number;
  @Input() public debt: SelectedDebt;
  @Output() public checkIfIsCCPlotWithPhotoAlertClicked = new EventEmitter();

  public confirmOK() {
    this.checkIfIsCCPlotWithPhotoAlertClicked.emit(this.debt);
  }
}
