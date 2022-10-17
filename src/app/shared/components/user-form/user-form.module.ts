import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { MatIconModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NgxLoadingModule } from 'ngx-loading';
import { faIdCard, faKey, faUserCircle, faCalendarAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    LayoutModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    UserFormComponent
  ]
})
export class UserFormModule {
  constructor() {
    library.add(faIdCard, faKey, faUserCircle, faCalendarAlt, faPhone, faEnvelope);
  }
}
