import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";

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
}
