import { Order, OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { DashboardQueries } from '../../services/dashboard';
const orderStore = new OrderStore();
const userStore = new UserStore();
const dashboardStore = new DashboardQueries();
describe('Dashboard service', () => {
    beforeAll(async () => {
        await userStore.reset();
        await orderStore.reset();
        const user = await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        await orderStore.create({
            status: 'active',
            userId: parseInt(user.id as unknown as string),
        });
        await orderStore.create({
            status: 'complete',
            userId: parseInt(user.id as unknown as string),
        });
    });
    it('should have a getCompleteOrders method', () => {
        expect(dashboardStore.getCompleteOrders).toBeDefined();
    });
    it('should have a getCurrentOrder method', () => {
        expect(dashboardStore.getCurrentOrder).toBeDefined();
    });
    it('getCompleteOrders method should return a list of complete orders for a given user', async () => {
        const result = await dashboardStore.getCompleteOrders(1);
        expect(result).toEqual([
            {
                id: 2,
                status: 'complete',
                user_id: '1',
            },
        ] as unknown as Order[]);
    });
    it('getCurrentOrder method should return current active order by a given user', async () => {
        const result = await dashboardStore.getCurrentOrder(1);
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        } as unknown as Order);
    });

    afterAll(async () => {
        await orderStore.reset();
        await userStore.reset();
    });
});
