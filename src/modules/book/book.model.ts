import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = function () {
  if (this.copies <= 0) {
    this.available = false;
  }
};

const Book = model<IBook>("Book", bookSchema);

export default Book;
