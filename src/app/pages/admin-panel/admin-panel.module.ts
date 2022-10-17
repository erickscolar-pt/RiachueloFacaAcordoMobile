import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatPaginatorModule, MatTableModule, MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserFormModule } from 'src/app/shared/components/user-form/user-form.module';
import { DateAdapter, MAT_DATE_FORMATS, SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker'

@NgModule({
  declarations: [
    AdminPanelComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
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
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    UserFormModule,
    SatNativeDateModule, 
    SatDatepickerModule 
  ],
  entryComponents: [
    UserUpdateComponent
  ]
})
export class AdminPanelModule { }
