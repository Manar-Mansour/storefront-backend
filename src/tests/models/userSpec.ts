import { User, UserStore } from '../../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
const store = new UserStore();
dotenv.config();
const { BCRYPT_PASSWORD } = process.env;
const pepper = BCRYPT_PASSWORD;
describe('User Model', () => {
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

    it('create method should add a user', async () => {
        const result = await store.create({
            firstName: 'Manar',
            lastName: 'Mansour',
            password: 'dummypassword',
        } as User);
        //@ts-ignore
        const { id, first_name, last_name, password_digest } = result;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Manar');
        expect(last_name).toEqual('Mansour');
        const compareResult = bcrypt.compareSync(
            'dummypassword' + pepper,
            password_digest
        );
        expect(compareResult).toBeTruthy();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        //@ts-ignore
        const { id, first_name, last_name, password_digest } = result[0];
        expect(id).toEqual(1);
        expect(first_name).toEqual('Manar');
        expect(last_name).toEqual('Mansour');
        const compareResult = bcrypt.compareSync(
            'dummypassword' + pepper,
            password_digest
        );
        //console.log(compareResult)
        expect(compareResult).toBeTruthy();
    });
    it('show method should return the correct user', async () => {
        const result = await store.show(1);
        //@ts-ignore
        const { id, first_name, last_name, password_digest } = result;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Manar');
        expect(last_name).toEqual('Mansour');
        const compareResult = bcrypt.compareSync(
            'dummypassword' + pepper,
            password_digest
        );
        //console.log(compareResult)
        expect(compareResult).toBeTruthy();
    });

    it('reset method should return an empty array', async () => {
        const result = await store.reset();
        expect(result).toEqual([]);
    });
    afterAll(async () => {
        await store.reset();
    });
});
