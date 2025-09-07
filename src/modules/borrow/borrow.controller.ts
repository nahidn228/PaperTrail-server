import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";
import { borrowService } from "./borrow.service";
import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";

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

const borrowBook = async (req: Request, res: Response) => {
  const { bookId, quantity, dueDate, email } = req.body;

  const borrow = await borrowService.borrowBookService({
    bookId,
    quantity,
    dueDate,
    email,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
};

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

const getBorrowSummary = async (req: Request, res: Response) => {
  const summary = await borrowService.getBorrowSummaryService();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
};

export { borrowBook, getBorrowSummary };
