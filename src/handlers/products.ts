import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products: Product[] = await store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const product: Product = await store.show(
        parseInt(req.params.id as string)
    );
    res.json(product);
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
    const product: Product = {
        name: req.body.name as string,
        price: parseInt(req.body.price as string),
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default productRoutes;
