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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).send({
                success: false,
                message: "Book not found",
            });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).send({
                success: false,
                message: "Not enough copies available",
            });
            return;
        }
        // Deduct quantity
        book.copies -= quantity;
        // Call instance method to update availability
        if (typeof book.updateAvailability === "function") {
            book.updateAvailability();
        }
        yield book.save();
        // Create borrow record
        const borrow = yield borrow_model_1.default.create({ book: bookId, quantity, dueDate });
        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to borrow book",
            error,
        });
    }
});
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            // Step 1: Group by book and sum borrow quantities
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            // Step 2: Join with the books collection to get title and ISBN
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            // Step 3: Extract the single book object from the array
            { $unwind: "$bookDetails" },
            // Step 4: Shape the final output
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error,
        });
    }
});
exports.borrowController = {
    borrowBook,
    getBorrowSummary
};
