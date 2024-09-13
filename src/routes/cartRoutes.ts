import { Router } from "express";
import { Container } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { ProductRepository } from "../repositories/productRepository";
import { ICartRepository } from "../interfaces/ICartRepository";
import { CartRepository } from "../repositories/cartRepository";
import { CartController } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorHandler";

const container = new Container();

container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);

container
  .bind<ICartRepository>(INTERFACE_TYPE.CartRepository)
  .to(CartRepository);

container.bind(INTERFACE_TYPE.CartController).to(CartController);

const cartRoutes: Router = Router();

const cartController = container.get<CartController>(
  INTERFACE_TYPE.CartController
);

cartRoutes.post(
  "/",
  [authMiddleware],
  errorHandler(cartController.addItemToCart.bind(cartController))
);

export default cartRoutes;
