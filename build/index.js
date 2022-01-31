"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, dashboard_1.default)(app);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("starting app on: ".concat(port));
});
