import { Router } from "express";
import { Container } from "inversify";
import { IPrismaService } from "../interfaces/IPrismaService";
import { INTERFACE_TYPE } from "../utils/appConst";
import { PrismaService } from "../services/PrismaService";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { AddressRepository } from "../repositories/addressRepository";
import { ICartRepository } from "../interfaces/ICartRepository";
import { CartRepository } from "../repositories/cartRepository";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { OrderRepository } from "../repositories/orderRepository";
import { OrderController } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorHandler";

const container = new Container();

container.bind<IPrismaService>(INTERFACE_TYPE.PrismaService).to(PrismaService);

container
  .bind<IAddressRepository>(INTERFACE_TYPE.AddressRepository)
  .to(AddressRepository);
container
  .bind<ICartRepository>(INTERFACE_TYPE.CartRepository)
  .to(CartRepository);
container
  .bind<IOrderRepository>(INTERFACE_TYPE.OrderRepository)
  .to(OrderRepository);

container.bind(INTERFACE_TYPE.OrderController).to(OrderController);

const orderRoutes: Router = Router();

const orderController = container.get<OrderController>(
  INTERFACE_TYPE.OrderController
);

orderRoutes.post(
  "/",
  [authMiddleware],
  errorHandler(orderController.createOrder.bind(orderController))
);

export default orderRoutes;
