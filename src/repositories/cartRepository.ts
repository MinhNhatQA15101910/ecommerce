import { injectable } from "inversify";
import { ICartRepository } from "../interfaces/ICartRepository";
import { prismaClient } from "..";

@injectable()
export class CartRepository implements ICartRepository {
  async createCartItem(cartData: any): Promise<any> {
    const cartItem = await prismaClient.cartItem.create({
      data: cartData,
    });
    return cartItem;
  }

  async deleteCartItem(cartItemId: number): Promise<any> {
    await prismaClient.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
