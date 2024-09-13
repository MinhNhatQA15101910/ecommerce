import { injectable } from "inversify";
import { prismaClient } from "..";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { Address } from "@prisma/client";

@injectable()
export class AddressRepository implements IAddressRepository {
  async addAddress(userId: number, addressData: any): Promise<Address> {
    const address = await prismaClient.address.create({
      data: {
        ...addressData,
        userId,
      },
    });
    return address;
  }

  async deleteAddress(addressId: number): Promise<void> {
    await prismaClient.address.delete({ where: { id: addressId } });
  }

  async getAddressById(addressId: number): Promise<Address> {
    const address = await prismaClient.address.findFirstOrThrow({
      where: { id: addressId },
    });
    return address;
  }

  async getAddresses(userId: number): Promise<Address[]> {
    const addresses = await prismaClient.address.findMany({
      where: { userId },
    });
    return addresses;
  }
}
