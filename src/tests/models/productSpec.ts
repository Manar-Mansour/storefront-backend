import { Product, ProductStore } from '../../models/product';
const store = new ProductStore();

describe('Product Model', () => {
    beforeAll(async () => {
        await store.reset();
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
    it('should have a reset method', () => {
        expect(store.reset).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Shampoo',
            price: 100,
        } as Product);
        expect(result).toEqual({
            id: 1,
            name: 'Shampoo',
            price: 100,
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Shampoo',
                price: 100,
            },
        ] as unknown as Product[]);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Shampoo',
            price: 100,
        } as unknown as Product);
    });

    it('reset method should return an empty array', async () => {
        const result = await store.reset();
        expect(result).toEqual([]);
    });
    afterAll(async () => {
        await store.reset();
    });
});
