import { Component, OnInit } from '@angular/core';
import { ReportService, SalesSummary } from './report.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styles: ``
})
export class ReportComponent  implements OnInit{
  salesSummaries: SalesSummary[] = [];
  selectedYear: number | null = null;
  totalAmount: number = 0;
  totalSalesCount: number = 0;

  constructor(private reportService: ReportService) {}
  ngOnInit(): void {}

  onYearChange(form: NgForm) {
    if (form.valid) {
      this.selectedYear = form.value.year;
      this.fetchSalesSummary();
    }
  }

  fetchSalesSummary() {
    if (this.selectedYear) {
      this.reportService.getYearlyReport(this.selectedYear).subscribe(
        (data) => {
          this.salesSummaries = data;
          this.calculateTotals();
        },
        (error) => console.error(error)
      );
    }
  }
  calculateTotals() {
    this.totalAmount = this.salesSummaries.reduce((sum, summary) => sum + Number(summary.TotalAmount), 0);
    this.totalSalesCount = this.salesSummaries.reduce((sum, summary) => sum + Number(summary.SalesCount), 0);
  }
  getMonthName(monthNumber: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber - 1];
  }
}

