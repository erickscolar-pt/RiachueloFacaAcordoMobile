import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordRecoverComponent } from './components/password-recover.component';

const routes: Routes = [
  {
    path: '', component: PasswordRecoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRecoverRoutingModule { }
