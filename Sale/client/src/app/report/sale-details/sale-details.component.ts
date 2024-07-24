import { Component } from '@angular/core';
import { ReportService, UserSalesDetails } from '../report.service';
import { NgForm } from '@angular/forms';
import { Transaction } from '../../app.service';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styles: ``
})
export class SaleDetailsComponent {
  userSalesDetails: UserSalesDetails[] = [];
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  totalAmount: number = 0;
  totalSalesCount: number = 0;
  expandedUser: number | null = null;
  userTransactions: { [key: number]: Transaction[] } = {};



  constructor(private reportService: ReportService){}


  onFilterChange(form: NgForm) {
    if (form.valid) {
      this.selectedYear = form.value.year;
      this.selectedMonth = form.value.month;
      this.fetchUserSalesDetails();
    }
  }

  fetchUserSalesDetails() {
    if (this.selectedYear && this.selectedMonth) {
      this.reportService.getUserSalesDetails(this.selectedYear, this.selectedMonth).subscribe(
        (data) => {
          this.userSalesDetails = data;
          this.calculateTotals();
        },
        (error) => console.error(error)
      );
    }
  }
  fetchUserTransactions(userID: number) {
    if (this.selectedYear && this.selectedMonth) {
      this.reportService.getUserTransactions(userID, this.selectedYear, this.selectedMonth).subscribe(
        (data) => {
          this.userTransactions[userID] = data;
          console.log(this.userTransactions[userID])
        },
        (error) => console.error(error)
      );
    }
  }
  calculateTotals() {
    this.totalAmount = this.userSalesDetails.reduce((sum, details) => sum + Number(details.TotalAmount), 0);
    this.totalSalesCount = this.userSalesDetails.reduce((sum, details) => sum + Number(details.SalesCount), 0);
  }

  getMonthName(monthNumber: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber - 1];
  }
  toggleExpand(userID: number) {
    if (this.expandedUser === userID) {
      this.expandedUser = null;
    } else {
      this.expandedUser = userID;
      if (!this.userTransactions[userID]) {
        this.fetchUserTransactions(userID);
      }
    }
  }
}
