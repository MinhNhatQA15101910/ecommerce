import { injectable } from "inversify";
import { prismaClient } from "..";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { Address, PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

@injectable()
export class AddressRepository implements IAddressRepository {
  async _getAddressById(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    addressId: number
  ): Promise<any> {
    const address = await prisma.address.findFirst({
      where: { id: addressId },
    });
    return address!;
  }

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
    const address = await prismaClient.address.findFirst({
      where: { id: addressId },
    });
    return address!;
  }

  async getAddresses(userId: number): Promise<Address[]> {
    const addresses = await prismaClient.address.findMany({
      where: { userId },
    });
    return addresses;
  }
}
