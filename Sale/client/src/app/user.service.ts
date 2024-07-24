import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
  UserID: number;
  UserName: string;
  LoginID: string;
  Password: string;
  UserRole: string;
  ReportingManager: string;
}

export interface Login {
  LoginID : string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5500/api';


  currentUser!: User
  constructor(private http: HttpClient) { }




  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, data);
  }








}
