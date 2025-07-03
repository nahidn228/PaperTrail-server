import { Router } from "express";
import bookRoutes from "../book/book.routes";
import borrowRoutes from "../borrow/borrow.routes";

const routes = Router();

routes.use("/api", bookRoutes);
routes.use("/api", borrowRoutes);




export default routes;
