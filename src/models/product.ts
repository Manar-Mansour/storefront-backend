import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

//index, show and create (token required)
export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not add new product ${p}. Error: ${err}`);
        }
    }
    async reset(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM products CASCADE';
            const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
            const result = await conn.query(sql);
            await conn.query(sql2);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not reset products. Error: ${err}`);
        }
    }
}
