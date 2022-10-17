import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailFormComponent } from './components/mail-form/mail-form.component';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MailFormComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule,
    MatButtonModule
  ]
})
export class MailFormModule { }
