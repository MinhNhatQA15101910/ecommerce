import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import cartRoutes from "./cartRoutes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/carts", cartRoutes);

export default rootRouter;
