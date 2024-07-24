import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../app.service';



export interface SalesSummary {
  Month: number;
  SalesCount: number;
  TotalAmount: number;
}

export interface UserSalesDetails {
  UserID: number;
  UserName: string;
  UserRole: string;
  ReportingManager: string;
  SalesCount: number;
  TotalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:5500/api';

  constructor(private http: HttpClient) { }


  getYearlyReport(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transaction/sales/${year}`);
  }


  getUserSalesDetails(year: number, month: number): Observable<UserSalesDetails[]> {
    return this.http.get<UserSalesDetails[]>(`${this.apiUrl}/transaction/sales-detail/${year}/${month}`);
  }

  getUserTransactions(userID: number, year: number, month: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transaction/user-transactions/${userID}/${year}/${month}`);
  }
}
