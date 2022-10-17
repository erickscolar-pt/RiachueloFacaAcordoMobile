import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfOrCpnjComponent } from './cpf-or-cpnj.component';
import { PasswordRecoverRoutingModule } from 'src/app/pages/password-recover/password-recover-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule, MatIconModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    CpfOrCpnjComponent
  ],
  imports: [
    CommonModule,
    PasswordRecoverRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
  ],
  exports: [
    CpfOrCpnjComponent
  ]
})
export class CpfOrCnpjModule { }
