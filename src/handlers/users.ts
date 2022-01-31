import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};

const store = new UserStore();

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
    const users: User[] = await store.index();
    res.json(users);
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
    const user: User = await store.show(parseInt(req.params.id as string));
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName as string,
        lastName: req.body.lastName as string,
        password: req.body.password as string,
    };
    try {
        const newUser = await store.create(user);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as Secret
        );
        res.json([newUser, token]);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default userRoutes;
