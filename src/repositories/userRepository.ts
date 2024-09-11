import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

@injectable()
export class UserRepository implements IUserRepository {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient({
      log: ["query"],
    });
  }

  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
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

  generateToken(userId: any): string {
    return jwt.sign({ userId }, JWT_SECRET);
  }

  async getUser(email: string) {
    return this._client.user.findFirst({ where: { email } });
  }
}
