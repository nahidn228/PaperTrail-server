"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_routes_1 = __importDefault(require("../book/book.routes"));
const borrow_routes_1 = __importDefault(require("../borrow/borrow.routes"));
const auth_route_1 = __importDefault(require("../auth/auth.route"));
const user_routs_1 = __importDefault(require("../user/user.routs"));
const routes = (0, express_1.Router)();
routes.use("/api", book_routes_1.default);
routes.use("/api", borrow_routes_1.default);
routes.use("/api/auth", auth_route_1.default);
routes.use("/api/user", user_routs_1.default);
exports.default = routes;
