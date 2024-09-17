import { injectable } from "inversify";
import { ICartRepository } from "../interfaces/ICartRepository";
import { prismaClient } from "..";
import { CartItem, PrismaClient, Product } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

@injectable()
export class CartRepository implements ICartRepository {
  async _emptyCart(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    userId: number
  ): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });
  }

  async _getCartById(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    userId: number
  ): Promise<({ product: Product } & CartItem)[]> {
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    return cart;
  }

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

  async getCartById(
    userId: number
  ): Promise<({ product: Product } & CartItem)[]> {
    const cart = await prismaClient.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    return cart;
  }

  async getCartItemById(cartItemId: number): Promise<CartItem> {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: { id: cartItemId },
    });
    return cartItem;
  }

  async getCartItemByProductId(productId: number): Promise<CartItem> {
    const cartItem = await prismaClient.cartItem.findFirst({
      where: { productId: productId },
    });
    return cartItem!;
  }

  async updateQuantity(
    cartItemId: number,
    quantity: number
  ): Promise<CartItem> {
    const updatedCartItem = await prismaClient.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return updatedCartItem;
  }
}
