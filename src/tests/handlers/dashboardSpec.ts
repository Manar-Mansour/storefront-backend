import supertest from 'supertest';
import express from 'express';
import { OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import dashboardRoutes from '../../handlers/dashboard';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const orderStore = new OrderStore();
const userStore = new UserStore();
const app = express();
dashboardRoutes(app);
const superapp = supertest(app);

describe('Dashboard endpoints', () => {
    let user1: User;
    let token1: string;
    beforeAll(async () => {
        await orderStore.reset();
        await userStore.reset();
        user1 = await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        token1 = jwt.sign({ user: user1 }, process.env.TOKEN_SECRET as Secret);
        await orderStore.create({
            status: 'active',
            userId: parseInt(user1.id as unknown as string),
        });
        await orderStore.create({
            status: 'complete',
            userId: parseInt(user1.id as unknown as string),
        });
    });
    it('Gets the complete-orders endpoint and the complete orders by the given user  if the token is valid', async () => {
        const response = await superapp
            .get('/users/1/complete-orders')
            .set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 2,
                status: 'complete',
                user_id: '1',
            },
        ]);
    });
    it('Gets the current-order endpoint and the current active order by the given user if the token is valid', async () => {
        const response = await superapp
            .get('/users/1/current-order')
            .set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    });

    it('The complete-orders endpoint gives access denied message if the token is invalid', async () => {
        const response = await superapp
            .get('/users/1/complete-orders')
            .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token');
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Access denied, invalid token');
    });

    it('The current-order endpoint gives access denied message if the token is invalid', async () => {
        const response = await superapp
            .get('/users/1/current-order')
            .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token');
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Access denied, invalid token');
    });
});
