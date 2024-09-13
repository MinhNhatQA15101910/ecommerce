import { injectable } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { prismaClient } from "..";
import { Product } from "@prisma/client";

@injectable()
export class ProductRepository implements IProductRepository {
  async createProduct(product: any): Promise<Product> {
    product = await prismaClient.product.create({
      data: {
        ...product,
        tags: product.tags.join(","),
      },
    });

    return product;
  }

  async deleteProduct(productId: number): Promise<void> {
    await prismaClient.product.delete({ where: { id: productId } });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await prismaClient.product.findFirstOrThrow({
      where: { id },
    });
    return product;
  }

  async getProducts(skip: number, take: number): Promise<Product[]> {
    const products = await prismaClient.product.findMany({ skip, take });
    return products;
  }

  async getProductsCount(): Promise<number> {
    return await prismaClient.product.count();
  }

  async updateProduct(id: number, product: any): Promise<Product> {
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: product,
    });

    return updatedProduct;
  }
}
