import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Transaction {
  TransactionID: number;
  SalesItem: string;
  SalesDate: Date;
  UserID: number;
  Amount: number;
}




@Injectable({
  providedIn: 'root'
})
export class AppService {



  private apiUrl = 'http://localhost:5500/api';



  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/transactions/${transaction.TransactionID}`, transaction);
  }

  deleteTransaction(transactionID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${transactionID}`);
  }

}
