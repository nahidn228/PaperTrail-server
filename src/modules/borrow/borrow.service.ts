import Book from "../book/book.model";
import Borrow from "./borrow.model";

interface BorrowBookParams {
  bookId: string;
  quantity: number;
  dueDate: Date;
  email: string;
}

const borrowBookService = async ({
  bookId,
  quantity,
  dueDate,
  email,
}: BorrowBookParams) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  // Call instance method to update availability
  if (typeof book.updateAvailability === "function") {
    book.updateAvailability();
  }

  // Deduct quantity
  book.copies -= quantity;

  await book.save();

  // Create borrow record
  const borrow = await Borrow.create({ bookId, quantity, dueDate, email });

  return borrow;
};


const getBorrowSummaryService = async () => {
  const summary = await Borrow.aggregate([
    // Step 1: Group by book and sum borrow quantities
    {
      $group: {
        _id: "$bookId",
        totalQuantity: { $sum: "$quantity" },
      },
    },

    // Step 2: Join with the books collection to get title and ISBN and other
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
          photo: "$bookDetails.photo",
          author: "$bookDetails.author",
        },
        totalQuantity: 1,
      },
    },
  ]);

  return summary;
};




export const borrowService = {
  borrowBookService,
  getBorrowSummaryService
};
