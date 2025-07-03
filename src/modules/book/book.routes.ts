import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoutes = Router();

bookRoutes.post("/create-book", bookController.createBook);
bookRoutes.get("/books/:bookId", bookController.getBookById);
bookRoutes.put("/edit-book/:bookId", bookController.updateBook);
bookRoutes.delete("/books/:bookId", bookController.deleteBook);

bookRoutes.get("/books", bookController.getAllBook);

export default bookRoutes;
