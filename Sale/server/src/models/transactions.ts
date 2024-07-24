import pool from "../db_database";
import * as dotenv from 'dotenv';

dotenv.config();

export interface Transactions {
  TransactionID: number;
  SalesItem: string;
  SalesDate: Date;
  UserID: number;
  Amount: number;
}
interface userProfile {
  UserName: string;
  LoginID: string;
  Password: string;
  UserRole: string;
  ReportingManager: string;
}

export default class transactionModel {
  // get all sales transactions order by desc 
  static getAllTransaction = async () => {
    try {
      const [result]: any = await pool.query(`
        SELECT * FROM beed_sales.salestransactions 
      ORDER BY SalesDate DESC`);
      return result;
    }
    catch (error) {
      console.log('something went wrong !!!')
    }
  };

  static insertTransaction = async (data: Transactions) => {
    try {
      const [result]: any = await pool.query("insert into beed_sales.salestransactions (SalesItem,SalesDate,UserID,Amount) values (?,?,?,?)", [
        data.SalesItem, data.SalesDate, data.UserID, data.Amount]);
      return true
    }
    catch (error) {
      console.log("something wrong with insert transactions")
    }
  };
  static getTransactionByID = async (TransactionID: number) => {
    try {
      const [result]: any = await pool.query(`SELECT * FROM beed_sales.salestransactions WHERE UserID=? `, [TransactionID]);
      return result[0];
    }
    catch (error) {
      console.log('transactionModel transactionByUserID  is going wrong')
    }
  };
  static updateTransactions = async (
    data: Transactions,
  ) => {
    try {
      const [result] = await pool.query(`
        update beed_sales.salestransactions 
        set SalesItem=?,SalesDate=?,UserID=?,Amount=? where TransactionID=?`, [
        data.SalesItem, data.SalesDate, data.UserID, data.Amount, data.TransactionID])
        ;
      return true
    } catch (error) {
      console.log("something wrong with update transactions")
    }

  }
  static deleteTransaction = async (TransactionID: number) => {
    try {
      const result =await pool.query("delete from beed_sales.salestransactions where TransactionID = ?", [TransactionID]);
      return result
    } catch (error) {
      console.log("something wrong with delete transaction")
    }
  }

  static getSalesSummaryByYear = async (
    year: number,
  ) => {
    try {
      const [result] = await pool.query(`
    SELECT 
      MONTH(SalesDate) AS Month,
      COUNT(*) AS SalesCount,
      SUM(Amount) AS TotalAmount
    FROM 
      beed_sales.salestransactions
    WHERE 
      YEAR(SalesDate) = ? 
    GROUP BY 
      MONTH(SalesDate)
    ORDER BY 
      MONTH(SalesDate);`, [
        year])
        ;
      return result
    } catch (error) {
      console.log("something wrong with update transactions")
    }

  }


  static getSalesDetails = async (
    year: number,
    month: number,
  ) => {
    try {
      const [result] = await pool.query(`
    SELECT 
        u.UserID, 
        u.UserName, 
        u.UserRole, 
        u.ReportingManager,
        COUNT(s.TransactionID) AS SalesCount, 
        SUM(s.Amount) AS TotalAmount
    FROM 
        beed_sales.salestransactions s
    JOIN 
        beed_sales.user_profile u ON s.UserID = u.UserID
    WHERE 
        YEAR(s.SalesDate) = ? 
        AND MONTH(s.SalesDate) = ?
    GROUP BY 
        u.UserID, u.UserName, u.UserRole, u.ReportingManager
    ORDER BY 
        u.UserName`, [
        year,month])
        ;
      return result
    } catch (error) {
      console.log("something wrong with update transactions")
    }

  }


  static getUserTransactions = async (
    userID: number,
    year: number,
    month: number,
  ) => {
    try {
      const [result] = await pool.query(`
        SELECT 
        TransactionID, 
        SalesItem, 
        SalesDate, 
        Amount 
    FROM 
        salestransactions 
    WHERE 
        UserID = ? 
        AND YEAR(SalesDate) = ? 
        AND MONTH(SalesDate) = ?`, [
          userID, year,month])
        ;
      return result
    } catch (error) {
      console.log("something wrong with update transactions")
    }

  }
}
