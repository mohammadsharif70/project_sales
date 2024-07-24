import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { authGuard } from './guards/auth.guard';
import { ReportComponent } from './report/report.component';
import { SaleDetailsComponent } from './report/sale-details/sale-details.component';

const routes: Routes = [
  {path: 'beed-sales' , component: AppComponent },
    {path: 'login', component: LoginComponent},
    {path: 'transactions', component: ListComponent , canActivate:[authGuard]},
    { path: 'report', component: ReportComponent , canActivate:[authGuard]},
    { path: 'sale-details', component: SaleDetailsComponent , canActivate:[authGuard]},
    // { path: '', redirectTo: 'beed-sales', pathMatch: 'full' },
    // { path: '**', redirectTo: 'beed-sales' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
