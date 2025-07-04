import { Request, Response } from "express";
import Book from "./book.model";
import { SortOrder } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);

    res.send({
      success: true,
      message: "Book Created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Book is not Created ",
      error,
    });
  }
};

const getAllBook = async (req: Request, res: Response) => {
  try {
    // const {
    //   filter,
    //   sortBy = "createdAt",
    //   sort = "asc",
    //   limit = "10",
    // } = req.query;

    // const filterCondition: Record<string, unknown> = {};
    // if (filterCondition) {
    //   filterCondition.genre = filter?.toString().toUpperCase();
    // }

    // const sortCondition: Record<string, SortOrder> = {};
    // sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;

    // const data = await Book.find(filterCondition)
    //   .sort(sortCondition)
    //   .limit(Number(limit));

    const data = await Book.find();

    res.send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Books retrieved Unsuccessful",
      error,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.send({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Book retrieved Unsuccessful",
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      success: true,
      message: "Book update successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Book update Unsuccessful",
      error,
    });
  }
};
const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);

    res.send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Book deletion unsuccessful",
      error,
    });
  }
};

export const bookController = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
