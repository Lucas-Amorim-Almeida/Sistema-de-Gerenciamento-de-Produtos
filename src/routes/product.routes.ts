import ProductController from "@/controllers/ProductController";
import productAuth from "@/middlewares/productAuth.midleware";
import userAuth from "@/middlewares/userAuth.middleware";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", userAuth, ProductController.createProduct);

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/search", ProductController.findProduct);

productRoutes.put(
  "/:id",
  userAuth,
  productAuth,
  ProductController.updateProduct,
);

productRoutes.delete(
  "/:id",
  userAuth,
  productAuth,
  ProductController.deleteProduct,
);

export default productRoutes;
