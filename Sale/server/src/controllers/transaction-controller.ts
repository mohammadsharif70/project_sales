import { Request, Response } from 'express';
import transactionModel, { Transactions } from '../models/transactions';



export const getAllTransaction = async (req: Request, res: Response) => {
    try {
        const result = await transactionModel.getAllTransaction();
        if (!result) {
            res.status(200).send("Not found");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getTransaction = async (req: Request, res: Response) => {
    const transactionID = parseInt(req.params.id);
    try {
        const result = await transactionModel.getTransactionByID(transactionID);
        if (!result) {
            res.status(404).send("Transaction with the given ID not found");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const insertTransaction = async (req: Request, res: Response) => {
    const data: Transactions = req.body;
    try {
        const result = await transactionModel.insertTransaction(data);
        if (!result) {
            res.status(400).send("Failed to insert transaction");
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    const data: Transactions = req.body;
    const transactionID = parseInt(req.params.id);
    try {
        const result = await transactionModel.updateTransactions(data);
        if (!result) {
            res.status(400).send("Failed to update transaction");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionID = parseInt(req.params.id);
    try {
        const result = await transactionModel.deleteTransaction(transactionID);
        if (!result) {
            res.status(404).send("Transaction with the given ID not found");
        } else {
            res.status(200).json({success :`Transaction with ID ${transactionID} deleted successfully`});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getYearlySalesSummary = async (req: Request, res: Response) => {
    try {
        const year = parseInt(req.params.year);
        const result = await transactionModel.getSalesSummaryByYear(year);
        if (!result) {
            res.status(200).send("Not found");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const getSalesDetails = async (req: Request, res: Response) => {
    try {
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        const result = await transactionModel.getSalesDetails(year,month);
        if (!result) {
            res.status(200).send("Not found");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const getUserTransactions = async (req: Request, res: Response) => {
    try {
        const userID = parseInt(req.params.userID);
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        const result = await transactionModel.getUserTransactions(userID,year,month);
        if (!result) {
            res.status(200).send("Not found");
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};