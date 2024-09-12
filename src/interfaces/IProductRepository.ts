export interface IProductRepository {
  createProduct(product: any): Promise<any>;
}
