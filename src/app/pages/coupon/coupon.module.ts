import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule, MatPaginatorModule, MatTableModule, MatSlideToggleModule, MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { CouponComponent } from './components/coupon/coupon.component';
import { FormCouponComponent } from './components/form-coupon/form-coupon.component';

@NgModule({
  declarations: [
    CouponComponent,
    FormCouponComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    LayoutModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    SweetAlert2Module,
    NgxLoadingModule.forRoot({}),
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ],
})
export class CouponModule { }
