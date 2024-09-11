import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "./exceptions/httpException";
import { InternalException } from "./exceptions/internalException";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;

      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          ErrorCodes.INTERNAL_ERROR,
          error
        );
      }

      next(exception);
    }
  };
};
