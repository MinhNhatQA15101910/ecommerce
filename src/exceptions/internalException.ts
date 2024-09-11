import { ErrorCodes, HttpException } from "./httpException";

export class InternalException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, errors: any) {
    super(message, errorCode, 500, errors);
  }
}
