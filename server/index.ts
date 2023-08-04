import { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import storiesRouter from "./routes/routes";

dotenv.config();

export const app: Express = express();
const PORT = 8000;

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/api", storiesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
