import { ErrorCodes, HttpException } from "./rootException";

export class BadRequestException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 400, null);
  }
}
