import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/directives/guards/auth.guard';
import { FaqComponent } from './pages/faq/faq.component';
import { AdminPanelGuard } from './shared/directives/guards/admin-panel.guard';
import { NotFoundOptionComponent } from './pages/not-found-option/not-found-option.component';
import { LoginGuard } from './shared/directives/guards/loading-routes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'debt',
    loadChildren: './pages/debt/debt.module#DebtModule',
    canLoad : [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule'
  },
  {
    path: 'recuperarSenha',
    loadChildren: './pages/password-recover/password-recover.module#PasswordRecoverModule'
  },
  {
    path: 'notFoundOption',
    component: NotFoundOptionComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canLoad : [AdminPanelGuard]
  },
  {
    path: 'admin',
    loadChildren: './pages/admin-panel/admin-panel.module#AdminPanelModule',
    canLoad : [AdminPanelGuard]
  },
  {
    path: 'coupon',
    loadChildren: './pages/coupon/coupon.module#CouponModule',
    canLoad : [AdminPanelGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [
            RouterModule.forRoot(routes),
            HttpClientModule
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
