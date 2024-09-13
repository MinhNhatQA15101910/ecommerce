import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "./exceptions/httpException";
import { InternalException } from "./exceptions/internalException";
import { ZodError } from "zod";
import { UnprocessableEntityException } from "./exceptions/unprocessableEntityException";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;

      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new UnprocessableEntityException(
            "Unprocessable entity",
            ErrorCodes.INTERNAL_ERROR,
            error
          );
        } else {
          exception = new InternalException(
            "Something went wrong!",
            ErrorCodes.INTERNAL_ERROR,
            error
          );
        }
      }

      next(exception);
    }
  };
};
