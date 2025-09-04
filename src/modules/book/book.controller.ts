import { Request, Response } from "express";
import Book from "./book.model";
import { SortOrder } from "mongoose";
import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";

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
  const {
    filter,
    sortBy = "createdAt",
    sort = "asc",
    limit = "10",
  } = req.query;

  const filterCondition: Record<string, unknown> = {};
  if (filterCondition) {
    filterCondition.genre = filter?.toString().toUpperCase();
  }

  const sortCondition: Record<string, SortOrder> = {};
  sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;

  const data = await Book.find(filterCondition)
    .sort(sortCondition)
    .limit(Number(limit));

  // const data = await Book.find();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Books retrieved successfully",
    data: data,
  });
};

const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findById(bookId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Books retrieved successfully",
    data: data,
  });
};

const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findByIdAndUpdate(bookId, req.body, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Book update successfully",
    data: data,
  });
};
const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findByIdAndDelete(bookId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
};

export const bookController = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
