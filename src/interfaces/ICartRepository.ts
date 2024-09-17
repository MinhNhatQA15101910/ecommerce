import { CartItem, PrismaClient, Product } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

export interface ICartRepository {
  _emptyCart(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    userId: number
  ): Promise<void>;
  _getCartById(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    userId: number
  ): Promise<({ product: Product } & CartItem)[]>;
  createCartItem(cartItem: any): Promise<CartItem>;
  deleteCartItem(cartItemId: number): Promise<void>;
  getCartById(userId: number): Promise<({ product: Product } & CartItem)[]>;
  getCartItemById(cartItemId: number): Promise<CartItem>;
  getCartItemByProductId(productId: number): Promise<CartItem>;
  updateQuantity(cartItemId: number, quantity: number): Promise<CartItem>;
}
