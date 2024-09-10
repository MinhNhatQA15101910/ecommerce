import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

@injectable()
export class UserRepository implements IUserRepository {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient({
      log: ["query"],
    });
  }

  async createUser(user: any) {
    user = await this._client.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10),
      },
    });

    return user;
  }

  async getUser(email: string) {
    return this._client.user.findFirst({ where: { email } });
  }
}
