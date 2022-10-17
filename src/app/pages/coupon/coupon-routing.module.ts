import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponComponent } from './components/coupon/coupon.component';
import { FormCouponComponent } from './components/form-coupon/form-coupon.component';

const routes: Routes = [
  {
    path: '',
    component: CouponComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
