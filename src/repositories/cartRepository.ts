import { injectable } from "inversify";
import { ICartRepository } from "../interfaces/ICartRepository";
import { prismaClient } from "..";
import { CartItem } from "@prisma/client";

@injectable()
export class CartRepository implements ICartRepository {
  async createCartItem(cartData: any): Promise<CartItem> {
    const cartItem = await prismaClient.cartItem.create({
      data: cartData,
    });
    return cartItem;
  }

  async deleteCartItem(cartItemId: number): Promise<void> {
    await prismaClient.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  async getCartItemById(cartItemId: number): Promise<CartItem> {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: { id: cartItemId },
    });
    return cartItem;
  }
}
