import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { NotFoundException } from "../exceptions/notFoundException";
import { ErrorCodes } from "../exceptions/httpException";

@injectable()
export class ProductController {
  private _productRepository: IProductRepository;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository)
    productRepository: IProductRepository
  ) {
    this._productRepository = productRepository;
  }

  async createProduct(req: Request, res: Response) {
    const product = await this._productRepository.createProduct(req.body);
    res.json(product);
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const product = req.body;

      if (product.tags) {
        product.tags = product.tags.join(",");
      }

      console.log(product);

      const updatedProduct = await this._productRepository.updateProduct(
        +req.params.id,
        product
      );

      res.json(updatedProduct);
    } catch (error) {
      throw new NotFoundException(
        "Product not found",
        ErrorCodes.PRODUCT_NOT_FOUND
      );
    }
  }

  async deleteProduct(req: Request, res: Response) {}

  async getProducts(req: Request, res: Response) {
    const count = await this._productRepository.getProductsCount();
    const products = await this._productRepository.getProducts(
      +req.query.skip! || 0,
      5
    );

    res.json({ count, data: products });
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await this._productRepository.getProductById(
        +req.params.id!
      );
      res.json(product);
    } catch (error) {
      throw new NotFoundException(
        "Product not found",
        ErrorCodes.PRODUCT_NOT_FOUND
      );
    }
  }
}
