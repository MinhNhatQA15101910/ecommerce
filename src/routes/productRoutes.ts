import { Router } from "express";
import { Container } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { ProductRepository } from "../repositories/productRepository";
import { ProductController } from "../controllers/productController";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const container = new Container();

container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);

container.bind(INTERFACE_TYPE.ProductController).to(ProductController);

const productRoutes: Router = Router();

const productController = container.get<ProductController>(
  INTERFACE_TYPE.ProductController
);

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.createProduct.bind(productController))
);

productRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.updateProduct.bind(productController))
);

productRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.deleteProduct.bind(productController))
);

productRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.getProducts.bind(productController))
);

productRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.getProductById.bind(productController))
);

export default productRoutes;
