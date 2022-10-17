import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicPayComponent } from './picpay.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    PicPayComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class PicpayModule { }
