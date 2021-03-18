import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import "@shared/container";
import "@database/typeorm/index";

import { ErrorMessages } from "@constants/index";
import routes from "@shared/infra/http/routes/index";

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3333;

app.use(routes);

app.use((err: Error | any, req: Request, res: Response, _: NextFunction) => {
  return res
    .status(err.statusCode)
    .json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
  