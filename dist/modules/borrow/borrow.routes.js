"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const router = (0, express_1.Router)();
router.post("/borrow", borrow_controller_1.borrowBook);
router.get("/borrow-summary", borrow_controller_1.getBorrowSummary);
exports.default = router;
