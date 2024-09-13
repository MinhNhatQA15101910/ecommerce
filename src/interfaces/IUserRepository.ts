import { User } from "@prisma/client";

export interface IUserRepository {
  comparePassword(password: string, hash: string): boolean;
  createUser(user: any): Promise<User>;
  generateToken(userId: any): string;
  getUser(email: string): Promise<User>;
  updateUser(userId: number, user: any): Promise<User>;
}
