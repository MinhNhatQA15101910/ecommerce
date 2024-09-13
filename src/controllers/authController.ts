import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ErrorCodes } from "../exceptions/httpException";
import { BadRequestException } from "../exceptions/badRequestException";
import { SignupSchema } from "../schemas/users";
import { NotFoundException } from "../exceptions/notFoundException";
import { UnprocessableEntityException } from "../exceptions/unprocessableEntityException";

@injectable()
export class AuthController {
  private _userRepository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async signup(req: Request, res: Response) {
    SignupSchema.parse(req.body);

    const { email, password, name } = req.body;

    let user = await this._userRepository.getUser(email);
    if (user) {
      throw new BadRequestException(
        "User already exists!",
        ErrorCodes.USER_ALREADY_EXISTS
      );
    }

    user = await this._userRepository.createUser({
      name,
      email,
      password,
    });

    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    let user = await this._userRepository.getUser(email);

    if (!user) {
      throw new NotFoundException(
        "User does not exists!",
        ErrorCodes.USER_NOT_FOUND
      );
    }

    if (!this._userRepository.comparePassword(password, user.password)) {
      throw new BadRequestException(
        "Incorrect password!",
        ErrorCodes.INCORRECT_PASSWORD
      );
    }

    const token = this._userRepository.generateToken(user.id);

    res.json({ user, token });
  }

  async me(req: any, res: Response) {
    res.json(req.user);
  }
}
