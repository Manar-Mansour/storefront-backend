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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var express_1 = __importDefault(require("express"));
var order_1 = require("../../models/order");
var product_1 = require("../../models/product");
var user_1 = require("../../models/user");
var orders_1 = __importDefault(require("../../handlers/orders"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var orderStore = new order_1.OrderStore();
var productStore = new product_1.ProductStore();
var userStore = new user_1.UserStore();
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, orders_1.default)(app);
var superapp = (0, supertest_1.default)(app);
describe('Order endpoints', function () {
    var user1;
    var token1;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.reset()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, userStore.reset()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, productStore.reset()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, userStore.create({
                            firstName: 'Manar',
                            lastName: 'Mansour',
                            password: 'dummypassword',
                        })];
                case 4:
                    //user 1
                    user1 = _a.sent();
                    token1 = jsonwebtoken_1.default.sign({ user: user1 }, process.env.TOKEN_SECRET);
                    //order 1
                    return [4 /*yield*/, orderStore.create({
                            userId: 1,
                            status: 'active',
                        })];
                case 5:
                    //order 1
                    _a.sent();
                    //order 2
                    return [4 /*yield*/, orderStore.create({
                            userId: 1,
                            status: 'complete',
                        })];
                case 6:
                    //order 2
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets the index endpoint and gets all orders when given a valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp.get('/orders').set('Authorization', 'Bearer ' + token1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([
                        {
                            id: 1,
                            user_id: '1',
                            status: 'active',
                        },
                        {
                            id: 2,
                            user_id: '1',
                            status: 'complete',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets the show endpoint and shows the specified order when given a valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp.get('/orders/1').set('Authorization', 'Bearer ' + token1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({
                        id: 1,
                        user_id: '1',
                        status: 'active',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('The post endpoint is working and returns the created order when given a valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp.post('/orders').send({
                        userId: 1,
                        status: 'active',
                    }).set('Authorization', 'Bearer ' + token1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({
                        id: 3,
                        user_id: '1',
                        status: 'active',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('The addProduct endpoint is working and returns the added product to the order when given a valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product1, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.create({
                        name: 'Shampoo',
                        price: 100,
                    })];
                case 1:
                    product1 = _a.sent();
                    return [4 /*yield*/, superapp.post('/orders/1/products').send({
                            quantity: 5,
                            productId: product1.id,
                        }).set('Authorization', 'Bearer ' + token1)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({
                        id: 1,
                        quantity: 5,
                        order_id: '1',
                        product_id: '1',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('The getProducts endpoint is working and gets all products in a specified order when given a valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp.get('/orders/1/products').set('Authorization', 'Bearer ' + token1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([
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
});
