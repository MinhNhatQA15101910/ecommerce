import { Address } from "@prisma/client";

export interface IAddressRepository {
  addAddress(userId: number, address: any): Promise<Address>;
  deleteAddress(addressId: number): Promise<void>;
  getAddressById(addressId: number): Promise<Address>;
  getAddresses(userId: number): Promise<Address[]>;
}
