import { Address, PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

export interface IAddressRepository {
  _getAddressById(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    addressId: number
  ): Promise<any>;
  addAddress(userId: number, address: any): Promise<Address>;
  deleteAddress(addressId: number): Promise<void>;
  getAddressById(addressId: number): Promise<Address>;
  getAddresses(userId: number): Promise<Address[]>;
}
