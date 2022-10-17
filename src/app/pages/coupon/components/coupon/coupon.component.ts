import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CouponService } from '../../providers/coupon.service';
import { Coupon } from '../../providers/coupon';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { FormCouponComponent } from '../form-coupon/form-coupon.component';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  public displayedColumns: string[] = ['active', 'promotedCod'];
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private coupon: CouponService,
    private loading: LoadingService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Tela ADMIN - Relatorio",localStorage.getItem('cpf')).subscribe();

    this.coupon.get()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Coupon>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  public slideIt(event, id) {
    const isActive = event.checked ? 'ativado' : 'inativado';
    this.loading.setLoad();
    this.coupon.patch(id)
      .subscribe({
        complete: () => {
          Swal.fire(
            'Sucesso',
            `Código ${isActive} com sucesso.`,
            'success'
          ).then(() => {
            this.coupon.get()
            .subscribe(data => {
              this.dataSource = new MatTableDataSource<Coupon>(data);
              this.dataSource.paginator = this.paginator;
            });
          });
          this.loading.stopLoad();
        },
        error: (err) => {
          this.loading.stopLoad();
          Swal.fire({
            type: 'error',
            title: 'Ops...',
            text: err,
          });
        }
      }
    );
  }

  public add() {
    const dialogRef = this.dialog.open(FormCouponComponent, {
      width: '65%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
