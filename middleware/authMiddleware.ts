import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: { role: string } | JwtPayload | string;
}

export const authorization = async (
  req: CustomRequest,
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

    jwt.verify(token, "your_jwt_secret", async (err, decoded) => {
      if (err) {
        logger.error(`Invalid Token: ${err.message}`);
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      logger.info("Token verified successfully");
      next();
    });
  } catch (error) {
    logger.error(`Authorization Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const roleBasedAccess = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    if (!user) {
      logger.error("Unauthorized access - User not found");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    let role: string | undefined;

    if (typeof user === "string") {
      const decoded = jwt.decode(user);
      role = (decoded as any)?.role;
    } else if ("role" in user) {
      role = user.role;
    } else if (typeof user === "object") {
      role = (user as any).role;
    }

    if (role && role === "admin") {
      next();
    } else {
      logger.error("Unauthorized access - Forbidden");
      res
        .status(403)
        .json({ message: "Forbidden: Unauthorized access - admin protected" });
    }
  } catch (error) {
    logger.error(`Error during role-based access check: ${error}`);
    return res
      .status(500)
      .json({ message: "Internal Server Error: Please try again later" });
  }
};
