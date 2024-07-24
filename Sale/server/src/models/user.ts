import { Request, Response } from 'express';
import pool from "../db_database";


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
export default class userModel {
    static login = async (data: Login) => {
        try {
            const [result]: any = await pool.query(`SELECT * FROM beed_sales.user_profile 
                WHERE LoginID = ? AND Password = ?
                `, [
                data.LoginID, data.Password]);
            return result
        }
        catch (error) {
            console.log("something wrong with insert transactions")
        }
    };
}