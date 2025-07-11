"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    bookId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: [1, "minimum quantity should be  1"], },
    dueDate: { type: Date, required: true },
}, { timestamps: true, versionKey: false });
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
