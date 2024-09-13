import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "inversify";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

@injectable()
export class UserRepository implements IUserRepository {
  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  async createUser(user: any) {
    user = await prismaClient.user.create({
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
    return prismaClient.user.findFirst({ where: { email } });
  }

  async updateUser(userId: number, user: any): Promise<any> {
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: user,
    });

    return updatedUser;
  }
}
