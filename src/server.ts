import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modules/routes";
import cookieParser from "cookie-parser";
import app from "./app";

app.use(express.json());
app.use(routes);

app.listen(config.port, () => {
  console.log(` server is running on port ${config.port}`);
});

async function server() {
  try {
    await mongoose.connect(config.database_env!);
    console.log(`✅ Connected to mongoDB`);
  } catch (error: any) {
    console.log(`server error: ${error.message}`);
  }
}
server();
