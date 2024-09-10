export interface IUserRepository {
  createUser(user: any): Promise<any>;
  getUser(email: string): Promise<any>;
}
