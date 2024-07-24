import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { SaleDetailsComponent } from './report/sale-details/sale-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    ReportComponent,
    SaleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
