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
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const filterCondition = {};
        if (filterCondition) {
            filterCondition.genre = filter === null || filter === void 0 ? void 0 : filter.toString().toUpperCase();
        }
        const sortCondition = {};
        sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;
        const data = yield book_model_1.default.find(filterCondition)
            .sort(sortCondition)
            .limit(Number(limit));
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Books retrieved Unsuccessful",
            error,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
        res.send({
            success: true,
            message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Book retrieved Unsuccessful",
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.send({
            success: true,
            message: "Book update successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Book update Unsuccessful",
            error,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(bookId);
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Book deletion unsuccessful",
            error,
        });
    }
});
exports.bookController = {
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook,
};
