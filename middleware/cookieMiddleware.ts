import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

export const useCookies = (req: Request, res: Response, next: NextFunction) => {
  cookieParser()(req, res, () => {
    if (!req.cookies.cart) {
      res.cookie('cart', JSON.stringify([]), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    }
    next();
  });
};
