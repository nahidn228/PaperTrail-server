import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
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

    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};


const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
};






export const borrowController = {
  borrowBook,
  getBorrowSummary
};
