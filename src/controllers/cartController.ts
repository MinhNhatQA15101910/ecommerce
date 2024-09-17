import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { AddToCartSchema, ChangeQuantitySchema } from "../schemas/carts";
import { NotFoundException } from "../exceptions/notFoundException";
import { ErrorCodes } from "../exceptions/httpException";
import { Product } from "@prisma/client";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { ICartRepository } from "../interfaces/ICartRepository";

@injectable()
export class CartController {
  private _productRepository: IProductRepository;
  private _cartRepository: ICartRepository;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository)
    productRepository: IProductRepository,
    @inject(INTERFACE_TYPE.CartRepository) cartRepository: ICartRepository
  ) {
    this._productRepository = productRepository;
    this._cartRepository = cartRepository;
  }

  async addItemToCart(req: any, res: Response) {
    const validatedData = AddToCartSchema.parse(req.body);

    let product: Product;
    try {
      product = await this._productRepository.getProductById(
        validatedData.productId
      );
    } catch (error) {
      throw new NotFoundException(
        "Product not found",
        ErrorCodes.PRODUCT_NOT_FOUND
      );
    }

    console.log(product);

    const existingCartItem = await this._cartRepository.getCartItemByProductId(
      product.id
    );
    if (existingCartItem) {
      const cartItem = await this._cartRepository.updateQuantity(
        existingCartItem.id,
        existingCartItem.quantity + validatedData.quantity
      );

      return res.json(cartItem);
    }

    const cartItem = await this._cartRepository.createCartItem({
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    });

    res.json(cartItem);
  }

  async deleteItemFromCart(req: any, res: Response) {
    let cartItem;
    try {
      cartItem = await this._cartRepository.getCartItemById(+req.params.id);
    } catch (error) {
      throw new NotFoundException(
        "Cart item not found.",
        ErrorCodes.CART_ITEM_NOT_FOUND
      );
    }

    if (cartItem.userId !== req.user.id) {
      throw new NotFoundException(
        "Cart item does not belong to user.",
        ErrorCodes.CART_ITEM_DOES_NOT_BELONG
      );
    }

    await this._cartRepository.deleteCartItem(+req.params.id);
    res.json({ success: true });
  }

  async changeQuantity(req: any, res: Response) {
    const validatedData = ChangeQuantitySchema.parse(req.body);

    let cartItem;
    try {
      cartItem = await this._cartRepository.getCartItemById(+req.params.id);
    } catch (error) {
      throw new NotFoundException(
        "Cart item not found.",
        ErrorCodes.CART_ITEM_NOT_FOUND
      );
    }

    if (cartItem.userId !== req.user.id) {
      throw new NotFoundException(
        "Cart item does not belong to user.",
        ErrorCodes.CART_ITEM_DOES_NOT_BELONG
      );
    }

    const updatedCart = await this._cartRepository.updateQuantity(
      +req.params.id,
      validatedData.quantity
    );

    res.json(updatedCart);
  }

  async getCart(req: any, res: Response) {
    const cart = await this._cartRepository.getCartById(req.user.id);
    res.json(cart);
  }
}
