export interface IProductRepository {
  createProduct(product: any): Promise<any>;
  deleteProduct(productId: number): Promise<any>;
  getProductById(id: number): Promise<any>;
  getProducts(skip: number, take: number): Promise<any[]>;
  getProductsCount(): Promise<number>;
  updateProduct(id: number, product: any): Promise<any>;
}
