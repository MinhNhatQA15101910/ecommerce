import { Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCodes } from "../exceptions/httpException";

export const adminMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.role !== "ADMIN") {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }

  next();
};
