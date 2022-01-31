import Client from '../database';
import { Order } from '../models/order';

export class DashboardQueries {
    //get all complete orders by a certain user
    async getCompleteOrders(userId: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT * FROM orders WHERE status=($1) AND user_id=($2)';
            const result = await conn.query(sql, ['complete', userId]);
            conn.release;
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not get completed orders by user ${userId}. Error: ${err}`
            );
        }
    }
    //get current order by a certain user
    async getCurrentOrder(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT * FROM orders WHERE status=($1) AND user_id=($2)';
            const result = await conn.query(sql, ['active', userId]);
            const currentOrder = result.rows[0];
            conn.release;
            return currentOrder;
        } catch (err) {
            throw new Error(
                `Could not get current order by user ${userId}. Error: ${err}`
            );
        }
    }
}
