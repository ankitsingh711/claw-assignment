import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser = require("body-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: process.env.NODE_ENV,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("E-Commerce Platform with Advanced Features");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
