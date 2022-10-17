import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';
import { CouponService } from '../../providers/coupon.service';
import { formatDate } from '@angular/common';
import { Coupon } from '../../providers/coupon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-coupon',
  templateUrl: './form-coupon.component.html',
  styleUrls: ['./form-coupon.component.scss']
})
export class FormCouponComponent implements OnInit {
  public formCoupon: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    public dialogRef: MatDialogRef<TermosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coupon: CouponService,
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Tela cupom",localStorage.getItem('cpf')).subscribe();

    this.formCoupon = this.fb.group({
      promotedCod: new FormControl('', [Validators.required]),
      expiration: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    if (this.formCoupon.valid) {
      const expiration = formatDate(this.formCoupon.value.expiration, 'yyyy-MM-ddThh:mm:ss', 'pt').toString();
      const coupon: Coupon = {
        expiration,
        promotedCod: this.formCoupon.get('promotedCod').value
      };
      this.coupon.post(coupon)
        .subscribe({
          complete: () => {
            Swal.fire(
              'Sucesso',
              'Código inserido com sucesso.',
              'success'
            );
            this.loading.stopLoad();
            this.dialogRef.close();
          },
          error: (err) => {
            this.loading.stopLoad();
            Swal.fire({
              type: 'error',
              title: 'Ops...',
              text: err,
            });
          }
        });
    }
  }

}
