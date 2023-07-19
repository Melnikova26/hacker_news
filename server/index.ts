import { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import storiesRouter from "./routes/routes";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

export const app: Express = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
    },
  })
);
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/api", storiesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
