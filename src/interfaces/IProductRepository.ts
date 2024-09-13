import { Product } from "@prisma/client";

export interface IProductRepository {
  createProduct(product: any): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
  getProductById(id: number): Promise<Product>;
  getProducts(skip: number, take: number): Promise<Product[]>;
  getProductsCount(): Promise<number>;
  updateProduct(id: number, product: any): Promise<Product>;
}
