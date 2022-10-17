import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardFormComponent } from './components/dashboard-form/dashboard-form.component';
import { DateAdapter, MAT_DATE_FORMATS, SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker'

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleChartsModule.forRoot(),
    LayoutModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxLoadingModule.forRoot({}),
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule
  ],
})
export class DashboardModule { }
