import { Router } from "express";
import { Container } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { UserRepository } from "../repositories/userRepository";
import { UserController } from "../controllers/userController";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AddressRepository } from "../repositories/addressRepository";
import { IAddressRepository } from "../interfaces/IAddressRepository";

const container = new Container();

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);
container
  .bind<IAddressRepository>(INTERFACE_TYPE.AddressRepository)
  .to(AddressRepository);

container.bind(INTERFACE_TYPE.UserController).to(UserController);

const userRoutes: Router = Router();

const userController = container.get<UserController>(
  INTERFACE_TYPE.UserController
);

userRoutes.post(
  "/addresses",
  [authMiddleware],
  errorHandler(userController.addAddress.bind(userController))
);

userRoutes.delete(
  "/addresses/:id",
  [authMiddleware],
  errorHandler(userController.deleteAddress.bind(userController))
);

userRoutes.get(
  "/addresses",
  [authMiddleware],
  errorHandler(userController.getAddresses.bind(userController))
);

userRoutes.put(
  "/",
  [authMiddleware],
  errorHandler(userController.updateUser.bind(userController))
);

export default userRoutes;
