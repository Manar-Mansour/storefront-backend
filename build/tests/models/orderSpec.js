"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var product_1 = require("../../models/product");
var user_1 = require("../../models/user");
var store = new order_1.OrderStore();
var userStore = new user_1.UserStore();
var productStore = new product_1.ProductStore();
describe('Order Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.resetOrderProducts()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, store.reset()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, userStore.reset()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, productStore.reset()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, userStore.create({
                            firstName: 'Manar',
                            lastName: 'Mansour',
                            password: 'dummypassword',
                        })];
                case 5:
                    user = _a.sent();
                    return [4 /*yield*/, store.create({
                            status: 'active',
                            userId: parseInt(user.id),
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, productStore.create({
                            name: 'Shampoo',
                            price: 100,
                        })];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('should have an addProduct method', function () {
        expect(store.addProduct).toBeDefined();
    });
    it('should have a getProducts method', function () {
        expect(store.getProducts).toBeDefined();
    });
    it('should have a reset method', function () {
        expect(store.reset).toBeDefined();
    });
    it('should have a resetOrderProducts method', function () {
        expect(store.resetOrderProducts).toBeDefined();
    });
    it('index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([
                        {
                            id: 1,
                            status: 'active',
                            user_id: '1',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create({
                        status: 'active',
                        userId: 1,
                    })];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        id: 2,
                        status: 'active',
                        user_id: '1',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show(1)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        id: 1,
                        status: 'active',
                        user_id: '1',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('addProduct method should add a product to an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.addProduct(5, 1, 1)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        id: 1,
                        quantity: 5,
                        order_id: '1',
                        product_id: '1',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('getProducts method should return the correct list of products in a given order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.getProducts(1)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([
                        {
                            id: 1,
                            quantity: 5,
                            order_id: '1',
                            product_id: '1',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('resetOrderProducts method should return an empty array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.reset()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reset method should return an empty array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.resetOrderProducts()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.resetOrderProducts()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, store.reset()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, userStore.reset()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, productStore.reset()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
