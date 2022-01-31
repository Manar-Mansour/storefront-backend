import Client from '../database';
export type Order = {
    id?: number;
    status: string;
    userId: number;
};
export type orderProduct = {
    id?: number;
    quantity: number;
    orderId: number;
    productId: number;
};
//create, index to show completed orders, show to get current order by a certain user
export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${o}. Error: ${err}`);
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async addProduct(
        quantity: number,
        orderId: number,
        productId: number
    ): Promise<orderProduct> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await Client.connect();

            const result = await conn.query(ordersql, [orderId]);

            const order = result.rows[0];

            if (order.status !== 'active') {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }
            conn.release();
        } catch (err) {
            throw new Error(`${err}`);
        }
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }

    async getProducts(orderId: number): Promise<orderProduct[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not get products in order ${orderId}. Error: ${err}`
            );
        }
    }
    async reset(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders CASCADE';
            const sql2 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
            const result = await conn.query(sql);
            await conn.query(sql2);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not reset orders. Error: ${err}`);
        }
    }
    async resetOrderProducts(): Promise<orderProduct[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM order_products CASCADE';
            const sql2 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
            const result = await conn.query(sql);
            await conn.query(sql2);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not reset order_products. Error: ${err}`);
        }
    }
}
