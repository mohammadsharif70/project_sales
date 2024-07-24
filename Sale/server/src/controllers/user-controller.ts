import { Request, Response } from 'express';

import userModel, { Login } from '../models/user';



export const login = async (req: Request, res: Response) => {
    try {
        const data: Login = req.body;
        const result = await userModel.login(data);
        if (!result || result.length === 0) {
            res.status(200).json({error : "LoginID or Password is incorrect"});
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


