import { Order, OrderStore, orderProduct } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';
const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
describe('Order Model', () => {
    beforeAll(async () => {
        await store.resetOrderProducts();
        await store.reset();
        await userStore.reset();
        await productStore.reset();
        const user = await userStore.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        });
        await store.create({
            status: 'active',
            userId: parseInt(user.id as unknown as string),
        });
        await productStore.create({
            name: 'Shampoo',
            price: 100,
        });
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('should have a getProducts method', () => {
        expect(store.getProducts).toBeDefined();
    });
    it('should have a reset method', () => {
        expect(store.reset).toBeDefined();
    });
    it('should have a resetOrderProducts method', () => {
        expect(store.resetOrderProducts).toBeDefined();
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: '1',
            },
        ] as unknown as Order[]);
    });
    it('create method should add an order', async () => {
        const result = await store.create({
            status: 'active',
            userId: 1,
        } as Order);
        expect(result).toEqual({
            id: 2,
            status: 'active',
            user_id: '1',
        } as unknown as Order);
    });
    it('show method should return the correct order', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1',
        } as unknown as Order);
    });
    it('addProduct method should add a product to an order', async () => {
        //quantity=5 , orderId=1, productId=1
        const result = await store.addProduct(5, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            order_id: '1',
            product_id: '1',
        } as unknown as orderProduct);
    });
    it('getProducts method should return the correct list of products in a given order', async () => {
        const result = await store.getProducts(1);
        expect(result).toEqual([
            {
                id: 1,
                quantity: 5,
                order_id: '1',
                product_id: '1',
            },
        ] as unknown as orderProduct[]);
    });
    it('resetOrderProducts method should return an empty array', async () => {
        const result = await store.reset();
        expect(result).toEqual([]);
    });
    it('reset method should return an empty array', async () => {
        const result = await store.resetOrderProducts();
        expect(result).toEqual([]);
    });
    afterAll(async () => {
        await store.resetOrderProducts();
        await store.reset();
        await userStore.reset();
        await productStore.reset();
    });
});
