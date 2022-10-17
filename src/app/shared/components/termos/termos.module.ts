import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermosComponent } from './termos.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    TermosComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class TermosModule { }
