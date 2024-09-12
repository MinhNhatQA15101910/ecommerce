import { injectable } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { prismaClient } from "..";

@injectable()
export class ProductRepository implements IProductRepository {
  async createProduct(product: any): Promise<any> {
    product = await prismaClient.product.create({
      data: {
        ...product,
        tags: product.tags.join(","),
      },
    });

    return product;
  }
}
