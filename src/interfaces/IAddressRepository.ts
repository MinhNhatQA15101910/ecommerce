export interface IAddressRepository {
  addAddress(userId: number, address: any): Promise<any>;
  deleteAddress(addressId: number): Promise<any>;
  getAddressById(addressId: number): Promise<any>;
  getAddresses(userId: number): Promise<any>;
}
