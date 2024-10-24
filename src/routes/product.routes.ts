import ProductController from "@/controllers/ProductController";
import userAuth from "@/middlewares/userAuth.middleware";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", userAuth, ProductController.createProduct);

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/search", ProductController.findProduct);

productRoutes.put("/:id", userAuth, ProductController.updateProduct);

productRoutes.delete("/:id", userAuth, ProductController.deleteProduct);

export default productRoutes;
