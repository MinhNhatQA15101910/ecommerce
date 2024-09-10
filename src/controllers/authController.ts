import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class AuthController {
  private _userRepository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;

    let user = await this._userRepository.getUser(email);

    user = await this._userRepository.createUser({
      name,
      email,
      password,
    });

    res.json(user);
  }
}
