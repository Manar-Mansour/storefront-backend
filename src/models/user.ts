import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

//index, show and create routes are required, tokens are required for each
export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds as string)
            );
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.firstName} ${u.lastName}. Error: ${err}`
            );
        }
    }
    async reset(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM users CASCADE';
            const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
            const result = await conn.query(sql);
            await conn.query(sql2);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not reset users. Error: ${err}`);
        }
    }
}
