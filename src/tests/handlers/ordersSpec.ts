import supertest from 'supertest';
import express from 'express';
import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import orderRoutes from '../../handlers/orders';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();
const app = express();
app.use(express.json());
orderRoutes(app);
const superapp = supertest(app);

describe('Order endpoints', () => {
    let user1: User;
    let token1: string;
    beforeAll(async () => {
        await orderStore.reset();
        await userStore.reset();
        await productStore.reset();
        //user 1
        user1= await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        token1 = jwt.sign({ user: user1 }, process.env.TOKEN_SECRET as Secret);
        //order 1
        await orderStore.create({
            userId: 1,
            status: 'active',
        });
        //order 2
        await orderStore.create({
            userId: 1,
            status: 'complete',
        });
    });
    it('Gets the index endpoint and gets all orders when given a valid token', async () => {
        const response = await superapp.get('/orders').set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 1,
                user_id: '1',
                status: 'active',
            },
            {
                id: 2,
                user_id: '1',
                status: 'complete',
            },
        ]);
    });
    it('Gets the show endpoint and shows the specified order when given a valid token', async () => {
        const response = await superapp.get('/orders/1').set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            user_id: '1',
            status: 'active',
        });
    });
    it('The post endpoint is working and returns the created order when given a valid token', async () => {
        const response = await superapp.post('/orders').send({
            userId: 1,
            status: 'active',
        }).set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 3,
            user_id: '1',
            status: 'active',
        });
    });

    it('The addProduct endpoint is working and returns the added product to the order when given a valid token', async () => {
        //product 1
        const product1 = await productStore.create({
            name: 'Shampoo',
            price: 100,
        });
        const response = await superapp.post('/orders/1/products').send({
            quantity: 5,
            productId: product1.id,
        }).set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            quantity: 5,
            order_id: '1',
            product_id: '1',
        });
    });

    it('The getProducts endpoint is working and gets all products in a specified order when given a valid token', async () => {
        const response = await superapp.get('/orders/1/products').set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 1,
                quantity: 5,
                order_id: '1',
                product_id: '1',
            },
        ]);
    });
});
