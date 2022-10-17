import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DebtCompanyComponent} from './components/debt-company/debt-company.component';
import {PaymentSuccessComponent} from '../payment/components/payment-success/payment-success.component';
import {SuggestionComponent} from './components/suggestion/suggestion.component';
import { DebtGuard } from 'src/app/shared/directives/guards/debt-routes.guard';
import { TelaAgendamentoComponent } from './components/tela-agendamento/tela-agendamento.component';

const routes: Routes = [
  {
    path: '', component: DebtCompanyComponent,
    canActivate : [DebtGuard]
  },
  {
    path: 'agendamento', component: TelaAgendamentoComponent
  },
  {
    path: '/:company', component: DebtCompanyComponent
  },
  {
    path: 'success', component: PaymentSuccessComponent
  },
  {
    path: 'warning', component: SuggestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtRoutingModule {
}
