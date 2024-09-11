export interface IUserRepository {
  comparePassword(password: string, hash: string): boolean;
  createUser(user: any): Promise<any>;
  generateToken(userId: any): string;
  getUser(email: string): Promise<any>;
}
