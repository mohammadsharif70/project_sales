import { Component, OnInit } from '@angular/core';
import { AppService, Transaction } from '../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedTransaction: Transaction | null = null;

  constructor(private adminService: AppService) {}

  ngOnInit() {
    this.loadTransactions();
  }


  loadTransactions() {
    this.adminService.getTransactions().subscribe(
      (data : any) => {this.transactions = data;},
      (error: any) => console.error(error)
    );
  }

  onAddTransaction(form: NgForm) {
    if (form.valid) {
      const newTransaction: Transaction = form.value;
      this.adminService.addTransaction(newTransaction).subscribe(
        (data: any) => {
        this.loadTransactions()

          form.resetForm();
        },
        (error: any) => console.error(error)
      );
    }
  }

  onSelectTransaction(transaction: Transaction) {
    this.selectedTransaction = { ...transaction };
  }

  onUpdateTransaction(form: NgForm) {
    if (this.selectedTransaction && form.valid) {
      console.log(form.controls['SalesDate'])
      const updatedTransaction: Transaction = { ...this.selectedTransaction, ...form.value };
      this.adminService.updateTransaction(updatedTransaction).subscribe(
        (data: any) => {
          this.loadTransactions()
          form.resetForm();
        },
        (error: any) => console.error(error)
      );
    }
  }

  onDeleteTransaction(transactionID: number) {
    this.adminService.deleteTransaction(transactionID).subscribe(
      () => {
        this.loadTransactions()
      },
      (error: any) => console.error(error)
    );
  }

  onCancelEdit() {
    this.selectedTransaction = null;
  }
}
