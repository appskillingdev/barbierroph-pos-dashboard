import express, { type Request, type Response } from "express";
import { middleware } from "./middlewares/middlewares.js";

const app = express();
const port: string = "3000";

app.get("/", middleware, (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
