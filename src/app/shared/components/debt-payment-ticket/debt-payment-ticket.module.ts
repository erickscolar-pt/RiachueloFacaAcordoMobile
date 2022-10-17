import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtPaymentTicketComponent } from './debt-payment-ticket.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PaymentService } from 'src/app/pages/payment/providers/payment.service';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DebtPaymentTicketComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    DebtPaymentTicketComponent
  ],
  providers: [
    PaymentService
  ]
})
export class DebtPaymentTicketModule { }
