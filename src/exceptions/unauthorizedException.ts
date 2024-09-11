import { ErrorCodes, HttpException } from "./httpException";

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, errors?: any) {
    super(message, errorCode, 401, errors);
  }
}
