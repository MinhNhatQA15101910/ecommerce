import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { AddToCartSchema } from "../schemas/carts";
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

    const cartItem = await this._cartRepository.createCartItem({
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    });

    res.json(cartItem);
  }

  async deleteItemFromCart(req: Request, res: Response) {
    await this._cartRepository.deleteCartItem(+req.params.id);
    res.json({ success: true });
  }

  async changeQuantity(req: Request, res: Response) {}

  async getCart(req: Request, res: Response) {}
}
