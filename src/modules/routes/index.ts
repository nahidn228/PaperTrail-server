import { Router } from "express";
import bookRoutes from "../book/book.routes";
import borrowRoutes from "../borrow/borrow.routes";
import authRouts from "../auth/auth.route";
import userRouts from "../user/user.routs";

const routes = Router();

routes.use("/api", bookRoutes);
routes.use("/api", borrowRoutes);
routes.use("/api/auth", authRouts);
routes.use("/api/user", userRouts);




export default routes;
