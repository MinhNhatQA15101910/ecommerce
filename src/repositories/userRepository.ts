import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "inversify";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

@injectable()
export class UserRepository implements IUserRepository {
  async addAddress(userId: number, addressData: any): Promise<any> {
    const address = await prismaClient.address.create({
      data: {
        ...addressData,
        userId,
      },
    });
    return address;
  }

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

  async deleteAddress(addressId: number): Promise<any> {
    await prismaClient.address.delete({ where: { id: addressId } });
  }

  generateToken(userId: any): string {
    return jwt.sign({ userId }, JWT_SECRET);
  }

  async getAddresses(userId: number): Promise<any> {
    const addresses = await prismaClient.address.findMany({
      where: { userId },
    });
    return addresses;
  }

  async getUser(email: string) {
    return prismaClient.user.findFirst({ where: { email } });
  }
}
