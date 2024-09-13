import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { UpdateUserSchema } from "../schemas/users";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { NotFoundException } from "../exceptions/notFoundException";
import { ErrorCodes } from "../exceptions/httpException";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { Address } from "@prisma/client";
import { BadRequestException } from "../exceptions/badRequestException";
import { AddressSchema } from "../schemas/addresses";

@injectable()
export class UserController {
  private _userRepository: IUserRepository;
  private _addressRepository: IAddressRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    userRepository: IUserRepository,
    @inject(INTERFACE_TYPE.AddressRepository)
    addressRepository: IAddressRepository
  ) {
    this._userRepository = userRepository;
    this._addressRepository = addressRepository;
  }

  async addAddress(req: any, res: Response) {
    AddressSchema.parse(req.body);

    const address = await this._addressRepository.addAddress(
      req.user.id,
      req.body
    );

    res.json(address);
  }

  async deleteAddress(req: Request, res: Response) {
    try {
      await this._addressRepository.deleteAddress(+req.params.id);
      res.json({ success: true });
    } catch (error) {
      throw new NotFoundException(
        "Address not found.",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
  }

  async getAddresses(req: any, res: Response) {
    const addresses = await this._addressRepository.getAddresses(req.user.id);
    res.json(addresses);
  }

  async updateUser(req: any, res: Response) {
    const validatedData = UpdateUserSchema.parse(req.body);

    let shippingAddress: Address;
    let billingAddress: Address;

    if (validatedData.defaultShippingAddressId) {
      try {
        shippingAddress = await this._addressRepository.getAddressById(
          validatedData.defaultShippingAddressId
        );
      } catch (error) {
        throw new NotFoundException(
          "Address not found.",
          ErrorCodes.ADDRESS_NOT_FOUND
        );
      }

      if (shippingAddress.userId !== req.user.id) {
        throw new BadRequestException(
          "Address does not belong to user.",
          ErrorCodes.ADDRESS_DOES_NOT_BELONG
        );
      }
    }

    if (validatedData.defaultBillingAddressId) {
      try {
        billingAddress = await this._addressRepository.getAddressById(
          validatedData.defaultBillingAddressId
        );
      } catch (error) {
        throw new NotFoundException(
          "Address not found.",
          ErrorCodes.ADDRESS_NOT_FOUND
        );
      }

      if (billingAddress.userId !== req.user.id) {
        throw new BadRequestException(
          "Address does not belong to user.",
          ErrorCodes.ADDRESS_DOES_NOT_BELONG
        );
      }
    }

    const updatedUser = await this._userRepository.updateUser(
      req.user.id,
      validatedData
    );

    res.json(updatedUser);
  }
}
