import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "inversify";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

@injectable()
export class UserRepository implements IUserRepository {
  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  async createUser(user: any): Promise<User> {
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

  async getUser(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({ where: { email } });
    return user!;
  }

  async updateUser(userId: number, user: any): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: user,
    });

    return updatedUser;
  }
}
