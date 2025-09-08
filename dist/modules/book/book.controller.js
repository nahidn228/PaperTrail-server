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
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const SendResponse_1 = require("../../utils/SendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.create(req.body);
        res.send({
            success: true,
            message: "Book Created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Book is not Created ",
            error,
        });
    }
});
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10", page = "1", } = req.query;
    const filterCondition = {};
    if (filter) {
        filterCondition.genre = filter.toString().toUpperCase();
    }
    const sortCondition = {};
    sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const data = yield book_model_1.default.find(filterCondition)
        .sort(sortCondition)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    const total = yield book_model_1.default.countDocuments(filterCondition);
    // const data = await Book.find();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: data,
        meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
        },
    });
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.default.findById(bookId);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: data,
    });
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
    });
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book update successfully",
        data: data,
    });
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.default.findByIdAndDelete(bookId);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
});
exports.bookController = {
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook,
};
