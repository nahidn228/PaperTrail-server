import { auth } from "../../middleware/auth";
import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";


import { UserRole } from "../user/user.constrain";
import { authController } from "./auth.controller";
import { AuthZodSchema } from "./auth.validate";

const authRouts = Router();

authRouts.post(
  "/register",
  validateRequest(AuthZodSchema.createUserZodSchema),
  authController.registerUser
);

authRouts.post(
  "/login",
  validateRequest(AuthZodSchema.loginUserZodSchema),
  authController.loginUser
);

authRouts.post("/refreshToken", authController.refreshToken);

authRouts.post(
  "/changePassword",
  auth(Object.values(UserRole)),
  validateRequest(AuthZodSchema.changePasswordZodSchema),
  authController.changePassword
);

authRouts.post(
  "/resetPassword",
  auth(Object.values(UserRole)),
  authController.resetpassword
);
authRouts.post("/logout", auth(Object.values(UserRole)), authController.logout);

export default authRouts;
