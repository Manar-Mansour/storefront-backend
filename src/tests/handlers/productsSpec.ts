import supertest from 'supertest';
import express from 'express';
import { ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import productRoutes from '../../handlers/products';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const productStore = new ProductStore();
const userStore = new UserStore();
const app = express();
app.use(express.json());
productRoutes(app);
const superapp = supertest(app);

describe('Product endpoints', () => {
    let user1: User;
    let token1: string;
    beforeAll(async () => {
        await productStore.reset();
        await userStore.reset();
        user1 = await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        token1 = jwt.sign({ user: user1 }, process.env.TOKEN_SECRET as Secret);
        await productStore.create({
            name: 'Shampoo',
            price: 100,
        });
        await productStore.create({
            name: 'Towel',
            price: 200,
        });
    });
    it('Gets the index endpoint and gets all products', async () => {
        const response = await superapp.get('/products');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 1,
                name: 'Shampoo',
                price: 100,
            },
            {
                id: 2,
                name: 'Towel',
                price: 200,
            },
        ]);
    });
    it('Gets the show endpoint and shows the specified product', async () => {
        const response = await superapp.get('/products/1');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'Shampoo',
            price: 100,
        });
    });
    it('The post endpoint is working and returns the created product if the token in the authorization header is valid', async () => {
        const response = await superapp
            .post('/products')
            .send({
                name: 'Shower Gel',
                price: 300,
            })
            .set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 3,
            name: 'Shower Gel',
            price: 300,
        });
    });
    it('The post endpoint gives access denied message and does not return a created product if the token in the authorization header is invalid', async () => {
        const response = await superapp
            .post('/products')
            .send({
                name: 'Shower Gel',
                price: 300,
            })
            .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token');
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Access denied, invalid token');
    });
});
