import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ErrorCodes } from "../exceptions/httpException";
import { BadRequestException } from "../exceptions/badRequestException";
import { UnprocessableEntityException } from "../exceptions/unprocessableEntityException";
import { SignupSchema } from "../schemas/users";

@injectable()
export class AuthController {
  private _userRepository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      SignupSchema.parse(req.body);
      const { email, password, name } = req.body;

      let user = await this._userRepository.getUser(email);
      if (user) {
        next(
          new BadRequestException(
            "User already exists!",
            ErrorCodes.USER_ALREADY_EXISTS
          )
        );
      }

      user = await this._userRepository.createUser({
        name,
        email,
        password,
      });

      res.json(user);
    } catch (err: any) {
      next(
        new UnprocessableEntityException(
          "Unprocessable entity",
          ErrorCodes.UNPROCESSABLE_ENTITY,
          err?.issues
        )
      );
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    let user = await this._userRepository.getUser(email);

    if (!user) {
      throw Error("User does not exists!");
    }

    if (!this._userRepository.comparePassword(password, user.password)) {
      throw Error("Incorrect password!");
    }

    const token = this._userRepository.generateToken(user.id);

    res.json({ user, token });
  }
}
