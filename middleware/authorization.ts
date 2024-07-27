import express, { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

export default authorization;
