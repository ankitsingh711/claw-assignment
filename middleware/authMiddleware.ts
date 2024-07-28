import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import logger from "../logger/logger";
import jwt from "jsonwebtoken";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
      if (err) {
        logger.error(`Invalid Token: ${err.message}`);
        return res.status(401).json({ message: "Invalid token" });
      } else {
        logger.info("Token verified successfully");
        next();
      }
    });
  } catch (error) {
    logger.error(`Authorization Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req;
  const user = await User.findById(userId);

  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
