import { Router } from "express";
import { borrowController } from "./borrow.controller";

const router = Router();

router.post("/borrow", borrowController.borrowBook);
router.get("/borrow-summary", borrowController.getBorrowSummary);

export default router;
