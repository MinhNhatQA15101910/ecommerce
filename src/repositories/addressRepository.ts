import { injectable } from "inversify";
import { prismaClient } from "..";
import { IAddressRepository } from "../interfaces/IAddressRepository";

@injectable()
export class AddressRepository implements IAddressRepository {
  async addAddress(userId: number, addressData: any): Promise<any> {
    const address = await prismaClient.address.create({
      data: {
        ...addressData,
        userId,
      },
    });
    return address;
  }

  async deleteAddress(addressId: number): Promise<any> {
    await prismaClient.address.delete({ where: { id: addressId } });
  }

  async getAddressById(addressId: number): Promise<any> {
    const address = await prismaClient.address.findFirstOrThrow({
      where: { id: addressId },
    });
    return address;
  }

  async getAddresses(userId: number): Promise<any> {
    const addresses = await prismaClient.address.findMany({
      where: { userId },
    });
    return addresses;
  }
}
