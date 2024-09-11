import { ErrorCodes, HttpException } from "./httpException";

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, errors: any) {
    super(message, errorCode, 422, errors);
  }
}
