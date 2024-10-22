import { Router } from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

export default router;
