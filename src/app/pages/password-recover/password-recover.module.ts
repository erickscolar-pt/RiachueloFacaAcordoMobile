import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoverRoutingModule } from './password-recover-routing.module';
import { PasswordRecoverComponent } from './components/password-recover.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule, MatIconModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatButtonModule } from '@angular/material';
import { CpfOrCnpjModule } from 'src/app/shared/cpf-or-cpnj/cpf-or-cnpj.module';

@NgModule({
  declarations: [
    PasswordRecoverComponent
  ],
  imports: [
    CommonModule,
    PasswordRecoverRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    CpfOrCnpjModule,
    MatButtonModule,
  ]
})
export class PasswordRecoverModule { }
