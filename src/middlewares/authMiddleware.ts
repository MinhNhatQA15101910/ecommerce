import { Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCodes } from "../exceptions/httpException";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract the token from the request header
  const token = req.headers.authorization;

  // 2. If the token is not present, throw an error of unauthorized
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }

  try {
    // 3. If the token is present, verify the token
    const payload = jwt.verify(token!, JWT_SECRET) as any;

    // 4. If the token is valid, get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
    }

    // 5. If the user is present, attach the user to the request object
    req.user = user!;

    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
};
