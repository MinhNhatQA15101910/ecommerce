export interface ICartRepository {
  createCartItem(cartItem: any): Promise<any>;
  deleteCartItem(cartItemId: number): Promise<any>;
}
