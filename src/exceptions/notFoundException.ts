import { ErrorCodes, HttpException } from "./httpException";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 404, null);
  }
}
