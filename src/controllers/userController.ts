import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { AddressSchema } from "../schemas/users";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { NotFoundException } from "../exceptions/notFoundException";
import { ErrorCodes } from "../exceptions/httpException";

@injectable()
export class UserController {
  private _userRepository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async addAddress(req: any, res: Response) {
    AddressSchema.parse(req.body);

    const address = await this._userRepository.addAddress(
      req.user.id,
      req.body
    );

    res.json(address);
  }

  async deleteAddress(req: Request, res: Response) {
    try {
      await this._userRepository.deleteAddress(+req.params.id);
      res.json({ success: true });
    } catch (error) {
      throw new NotFoundException(
        "Address not found.",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
  }

  async getAddresses(req: any, res: Response) {
    const addresses = await this._userRepository.getAddresses(req.user.id);
    res.json(addresses);
  }
}
