import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {DebtRoutingModule} from './debt-routing.module';
import {DebtComponent} from './components/debt/debt.component';
import {MatCardModule, MatButtonModule, MatIconModule, MatSliderModule, MatTabsModule, MatCheckboxModule, MatSelectModule, MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {DebtProfileComponent} from './components/debt-profile/debt-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DebtInstallmentComponent} from './components/debt-installment/debt-installment.component';
import {DebtCompanyComponent} from './components/debt-company/debt-company.component';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PaymentComponent} from '../payment/components/payment/payment.component';
import {PaymentCreditCardComponent} from '../payment/components/payment-credit-card/payment-credit-card.component';
import {PaymentTicketComponent} from '../payment/components/payment-ticket/payment-ticket.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {PaymentSuccessComponent} from '../payment/components/payment-success/payment-success.component';
import {DebtDealComponent} from './components/debt-deal/debt-deal.component';
import {DebtPaymentTicketModule} from 'src/app/shared/components/debt-payment-ticket/debt-payment-ticket.module';
import {PaymentFormComponent} from '../payment/components/payment-form/payment-form.component';
import {TermosModule} from 'src/app/shared/components/termos/termos.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxMaskModule} from 'ngx-mask';
import {SuggestionComponent} from './components/suggestion/suggestion.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxLoadingModule} from 'ngx-loading';
import {GoogleChartsModule} from 'angular-google-charts';
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {PaymentCreditCardWarningComponent} from "../payment/components/payment-credit-card-warning/payment-credit-card-warning.component";
import { ProfileLocalStorageComponent } from './components/profile-local-storage/profile-local-storage.component';
import { TelaAgendamentoComponent } from './components/tela-agendamento/tela-agendamento.component';
import { PrivacyPolicyModule } from 'src/app/shared/components/privacy-policy/PrivacyPolicy.module';

@NgModule({
  declarations: [
    DebtProfileComponent,
    DebtComponent,
    DebtInstallmentComponent,
    DebtCompanyComponent,
    PaymentComponent,
    PaymentCreditCardComponent,
    PaymentCreditCardWarningComponent,
    PaymentTicketComponent,
    PaymentSuccessComponent,
    PaymentFormComponent,
    DebtDealComponent,
    SuggestionComponent,
    ProfileLocalStorageComponent,
    TelaAgendamentoComponent,
  ],
    imports: [
        CommonModule,
        DebtRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatSliderModule,
        MatTabsModule,
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        DebtPaymentTicketModule,
        TermosModule,
        PrivacyPolicyModule,
        SweetAlert2Module,
        NgxMaskModule.forRoot(),
        FontAwesomeModule,
        MatCheckboxModule,
        MatSnackBarModule,
        NgxLoadingModule.forRoot({}),
        MatSelectModule,
        GoogleChartsModule.forRoot(),
        NgxMatFileInputModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
      DatePipe,
    ]
})
export class DebtModule {
}
