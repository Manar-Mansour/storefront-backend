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
var user_1 = require("../../models/user");
var users_1 = __importDefault(require("../../handlers/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var userStore = new user_1.UserStore();
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, users_1.default)(app);
var superapp = (0, supertest_1.default)(app);
describe('User endpoints', function () {
    var user1;
    var user2;
    var token1;
    var token2;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.reset()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, userStore.create({
                            firstName: 'Manar',
                            lastName: 'Mansour',
                            password: 'dummypassword',
                        })];
                case 2:
                    user1 = _a.sent();
                    token1 = jsonwebtoken_1.default.sign({ user: user1 }, process.env.TOKEN_SECRET);
                    return [4 /*yield*/, userStore.create({
                            firstName: 'Shereen',
                            lastName: 'Ahmed',
                            password: 'herpassword',
                        })];
                case 3:
                    user2 = _a.sent();
                    token2 = jsonwebtoken_1.default.sign({ user: user2 }, process.env.TOKEN_SECRET);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets the index endpoint and gets all users if the token in the authorization header is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp
                        .get('/users')
                        .set('Authorization', 'Bearer ' + token1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([
                        {
                            id: 1,
                            first_name: 'Manar',
                            last_name: 'Mansour',
                            password_digest: response.body[0].password_digest,
                        },
                        {
                            id: 2,
                            first_name: 'Shereen',
                            last_name: 'Ahmed',
                            password_digest: response.body[1].password_digest,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('The index endpoint gives access denied message if the token in the authorization header is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp
                        .get('/users')
                        .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual('Access denied, invalid token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets the show endpoint and shows the specified user if the token in the authorization header is valid ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp
                        .get('/users/1')
                        .set('Authorization', 'Bearer ' + token2)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({
                        id: 1,
                        first_name: 'Manar',
                        last_name: 'Mansour',
                        password_digest: response.body.password_digest,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('The show endpoint gives access denied message if the token in the authorization header is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp
                        .get('/users/1')
                        .set('Authorization', 'Bearer ' + 'some_dummy_invalid_token')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual('Access denied, invalid token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('The post endpoint is working and returns the created user and the token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superapp.post('/users').send({
                        firstName: 'Khaled',
                        lastName: 'Abdelgalil',
                        password: 'pass',
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    token = response.body[1];
                    expect(response.body).toEqual([
                        {
                            id: 3,
                            first_name: 'Khaled',
                            last_name: 'Abdelgalil',
                            password_digest: response.body[0].password_digest,
                        },
                        token,
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
