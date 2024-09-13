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

  async getProductById(id: number): Promise<any> {
    console.log(id);
    const product = await prismaClient.product.findFirstOrThrow({
      where: { id },
    });
    return product;
  }

  async getProducts(skip: number, take: number): Promise<any[]> {
    const products = await prismaClient.product.findMany({ skip, take });
    return products;
  }

  async getProductsCount(): Promise<number> {
    return await prismaClient.product.count();
  }

  async updateProduct(id: number, product: any): Promise<any> {
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: product,
    });

    return updatedProduct;
  }
}
