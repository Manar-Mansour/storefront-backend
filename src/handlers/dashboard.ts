import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const dashboardRoutes = (app: express.Application) => {
    app.get('/users/:id/complete-orders', userCompleteOrders);
    app.get('/users/:id/current-order', userCurrentOrder);
};

const dashboard = new DashboardQueries();

const userCompleteOrders = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers
            .authorization as unknown as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const completeOrders = await dashboard.getCompleteOrders(
        parseInt(req.params.id as string)
    );
    res.json(completeOrders);
};

const userCurrentOrder = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers
            .authorization as unknown as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const currentOrder = await dashboard.getCurrentOrder(
        parseInt(req.params.id as string)
    );
    res.json(currentOrder);
};

export default dashboardRoutes;
