import supertest from 'supertest';
import express from 'express';
import { User, UserStore } from '../../models/user';
import userRoutes from '../../handlers/users';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userStore = new UserStore();
const app = express();
app.use(express.json());
userRoutes(app);
const superapp = supertest(app);

describe('User endpoints', () => {
    let user1: User;
    let user2: User;
    let token1: string;
    let token2: string;
    beforeAll(async () => {
        await userStore.reset();

        user1 = await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        token1 = jwt.sign({ user: user1 }, process.env.TOKEN_SECRET as Secret);

        user2 = await userStore.create({
            firstName: 'Shereen',
            lastName: 'Ahmed',
            password: 'herpassword',
        });
        token2 = jwt.sign({ user: user2 }, process.env.TOKEN_SECRET as Secret);
    });
    it('Gets the index endpoint and gets all users if the token in the authorization header is valid', async () => {
        const response = await superapp
            .get('/users')
            .set('Authorization', 'Bearer ' + token1);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 1,
                first_name: 'Manar',
                last_name: 'Mansour',
                password_digest: response.body[0].password_digest as string,
            },
            {
                id: 2,
                first_name: 'Shereen',
                last_name: 'Ahmed',
                password_digest: response.body[1].password_digest as string,
            },
        ]);
    });

    it('The index endpoint gives access denied message if the token in the authorization header is invalid', async () => {
        const response = await superapp
            .get('/users')
            .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token');
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Access denied, invalid token');
    });

    it('Gets the show endpoint and shows the specified user if the token in the authorization header is valid ', async () => {
        const response = await superapp
            .get('/users/1')
            .set('Authorization', 'Bearer ' + token2);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            first_name: 'Manar',
            last_name: 'Mansour',
            password_digest: response.body.password_digest as string,
        });
    });

    it('The show endpoint gives access denied message if the token in the authorization header is invalid', async () => {
        const response = await superapp
            .get('/users/1')
            .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token');
        expect(response.status).toEqual(401);
        expect(response.body).toEqual('Access denied, invalid token');
    });

    it('The post endpoint is working and returns the created user and the token', async () => {
        const response = await superapp.post('/users').send({
            firstName: 'Khaled',
            lastName: 'Abdelgalil',
            password: 'pass',
        });
        expect(response.status).toEqual(200);
        const token = response.body[1] as string;
        expect(response.body).toEqual([
            {
                id: 3,
                first_name: 'Khaled',
                last_name: 'Abdelgalil',
                password_digest: response.body[0].password_digest as string,
            },
            token,
        ]);
    });
});
