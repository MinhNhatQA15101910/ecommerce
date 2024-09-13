export interface IUserRepository {
  addAddress(userId: number, address: any): Promise<any>;
  comparePassword(password: string, hash: string): boolean;
  createUser(user: any): Promise<any>;
  deleteAddress(addressId: number): Promise<any>;
  generateToken(userId: any): string;
  getAddresses(userId: number): Promise<any>;
  getUser(email: string): Promise<any>;
}
