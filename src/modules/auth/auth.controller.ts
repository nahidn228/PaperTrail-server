import { Request, Response } from "express";

import status from "http-status";

import config from "../../config";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  console.log("from auth controller", payload);

  const data = await AuthServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: data,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await AuthServices.loginUserIntoDB(payload);

  res.cookie("accessToken", data.accessToken, {
    secure: config.node_env !== "development",
    // secure: true,
    // secure: false,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // sameSite: "none",
  });

  res.cookie("refreshToken", data.refreshToken, {
    secure: config.node_env !== "development",
    // secure: true,
    // secure: false,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // sameSite: "none",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Login successfully",
    data: data,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const data = await AuthServices.refreshTokenIntoDB(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Token Refresh successfully",
    data: data,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const { newPassword, oldPassword } = req.body;
  const data = await AuthServices.changePasswordIntoDB(
    email,
    newPassword,
    oldPassword
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password Changed successfully",
    data: data,
  });
});

const resetpassword = catchAsync(async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;
  const data = await AuthServices.resetPasswordIntoDB(email, phone, password);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password Reset successfully",
    data: data,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Logged out successfully",
    data: null,
  });
});

export const authController = {
  registerUser,
  loginUser,
  changePassword,
  resetpassword,
  refreshToken,
  logout,
};
