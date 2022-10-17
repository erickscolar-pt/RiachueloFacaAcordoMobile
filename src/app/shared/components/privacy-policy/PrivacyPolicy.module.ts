import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { PrivacyPolicyComponent } from './privacy-policy.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class PrivacyPolicyModule { }
