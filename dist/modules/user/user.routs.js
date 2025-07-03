"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouts = (0, express_1.Router)();
userRouts.post("/", user_controller_1.registerUser);
userRouts.get("/", user_controller_1.getUsers);
exports.default = userRouts;
