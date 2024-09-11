import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { Container } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { UserRepository } from "../repositories/userRepository";
import { errorHandler } from "../errorHandler";

const container = new Container();

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);

container.bind(INTERFACE_TYPE.AuthController).to(AuthController);

const authRoutes: Router = Router();

const authController = container.get<AuthController>(
  INTERFACE_TYPE.AuthController
);

authRoutes.post(
  "/signup",
  errorHandler(authController.signup.bind(authController))
);
authRoutes.post(
  "/login",
  errorHandler(authController.login.bind(authController))
);

export default authRoutes;
