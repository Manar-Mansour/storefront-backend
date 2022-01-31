import express, { Request, Response } from 'express';
import { orderProduct, Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    // add product
    app.post('/orders/:id/products', addProduct);
    //get all products in an order
    app.get('/orders/:id/products', getProducts);
};

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
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
    const orders: Order[] = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
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
    const order: Order = await store.show(parseInt(req.params.id as string));
    res.json(order);
};

const create = async (req: Request, res: Response) => {
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
    const order: Order = {
        userId: parseInt(req.body.userId as string),
        status: 'active',
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
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
    const orderId: number = parseInt(req.params.id as string);
    const productId: number = parseInt(req.body.productId as string);
    const quantity: number = parseInt(req.body.quantity);
    try {
        const addedProduct = await store.addProduct(
            quantity,
            orderId,
            productId
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getProducts = async (req: Request, res: Response) => {
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
    const orderProducts: orderProduct[] = await store.getProducts(
        parseInt(req.params.id as string)
    );
    res.json(orderProducts);
};
export default orderRoutes;
