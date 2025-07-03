"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "title is required"], },
    author: { type: String, required: [true, "author  is required"], },
    genre: {
        type: String,
        uppercase: true,
        required: [true, "genre is required"],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not acceptable",
        },
    },
    isbn: { type: String, required: [true, "isbn is required"], },
    description: { type: String, default: "" },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.methods.updateAvailability = function () {
    if (this.copies <= 0) {
        this.available = false;
    }
};
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
