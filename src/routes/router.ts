import { Router } from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import userAuth from "@/middlewares/userAuth.middleware";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", userAuth, orderRoutes);

export default router;
