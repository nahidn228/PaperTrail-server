import { Request, Response } from "express";
import User from "./user.model";

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;
  const user = new User(payload);

  const data = await user.save();

  res.send({
    success: true,
    message: "User registered successfully",
    data,
  });
};

const getUsers = async (req: Request, res: Response) => {
  const data = await User.find();
  res.send({
    success: true,
    message: "User retrieved successfully",
    data,
  });
};

export { registerUser, getUsers };
