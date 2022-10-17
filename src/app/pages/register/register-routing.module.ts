import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { AdminPanelGuard } from 'src/app/shared/directives/guards/admin-panel.guard';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'admin', component: RegisterComponent, canActivate: [AdminPanelGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
