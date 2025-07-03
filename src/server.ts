import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modules/routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://paper-trail-one.vercel.app"],
  })
);

app.use(express.json());
app.use(routes);

app.listen(config.port, () => {
  console.log(` server is running on port ${config.port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "PaperTrail is Running",
  });
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
