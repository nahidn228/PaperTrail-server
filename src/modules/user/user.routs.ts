import { Router } from "express";
import { getUsers, registerUser } from "./user.controller";

const userRouts = Router();

userRouts.post("/", registerUser);
userRouts.get("/", getUsers);

export default userRouts;
