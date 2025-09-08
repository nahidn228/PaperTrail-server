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
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_service_1 = require("./borrow.service");
const SendResponse_1 = require("../../utils/SendResponse");
const http_status_1 = __importDefault(require("http-status"));
// const borrowBook = async (req: Request, res: Response) => {
//   try {
//     const {  bookId, quantity, dueDate } = req.body;
//     const book = await Book.findById(bookId);
//     if (!book) {
//       res.status(404).send({
//         success: false,
//         message: "Book not found",
//       });
//       return;
//     }
//     if (book.copies < quantity) {
//       res.status(400).send({
//         success: false,
//         message: "Not enough copies available",
//       });
//       return;
//     }
//     // Deduct quantity
//     book.copies -= quantity;
//     // Call instance method to update availability
//     if (typeof book.updateAvailability === "function") {
//       book.updateAvailability();
//     }
//     await book.save();
//     // Create borrow record
//     const borrow = await Borrow.create({  bookId, quantity, dueDate });
//     res.status(201).send({
//       success: true,
//       message: "Book borrowed successfully",
//       data: borrow,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Failed to borrow book",
//       error,
//     });
//   }
// };
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, quantity, dueDate, email } = req.body;
    const borrow = yield borrow_service_1.borrowService.borrowBookService({
        bookId,
        quantity,
        dueDate,
        email,
    });
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
});
exports.borrowBook = borrowBook;
// const getBorrowSummary = async (req: Request, res: Response) => {
//   try {
//     const summary = await Borrow.aggregate([
//       // Step 1: Group by book and sum borrow quantities
//       {
//         $group: {
//           _id: "$bookId",
//           totalQuantity: { $sum: "$quantity" },
//         },
//       },
//       // Step 2: Join with the books collection to get title and ISBN
//       {
//         $lookup: {
//           from: "books",
//           localField: "_id",
//           foreignField: "_id",
//           as: "bookDetails",
//         },
//       },
//       // Step 3: Extract the single book object from the array
//       { $unwind: "$bookDetails" },
//       // Step 4: Shape the final output
//       {
//         $project: {
//           _id: 0,
//           book: {
//             title: "$bookDetails.title",
//             isbn: "$bookDetails.isbn",
//             photo: "$bookDetails.photo",
//             author: "$bookDetails.author",
//           },
//           totalQuantity: 1,
//         },
//       },
//     ]);
//     res.status(200).json({
//       success: true,
//       message: "Borrowed books summary retrieved successfully",
//       data: summary,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve borrowed books summary",
//       error,
//     });
//   }
// };
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_service_1.borrowService.getBorrowSummaryService();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
    });
});
exports.getBorrowSummary = getBorrowSummary;
