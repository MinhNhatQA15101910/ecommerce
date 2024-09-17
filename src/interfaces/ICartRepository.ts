import { CartItem } from "@prisma/client";

export interface ICartRepository {
  createCartItem(cartItem: any): Promise<CartItem>;
  deleteCartItem(cartItemId: number): Promise<void>;
  getCartItemById(cartItemId: number): Promise<CartItem>;
  getCartItemByProductId(productId: number): Promise<CartItem>;
  updateQuantity(cartItemId: number, quantity: number): Promise<CartItem>;
}
