import { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import storiesRouter from "./routes/routes";
import cors from "cors";

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/api", storiesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
