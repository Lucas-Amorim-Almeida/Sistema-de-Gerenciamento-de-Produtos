import ProductController from "@/controllers/ProductController";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", ProductController.createProduct);

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/search", ProductController.findProduct);

productRoutes.put("/:id", ProductController.updateProduct);

productRoutes.delete("/:id", ProductController.deleteProduct);

export default productRoutes;
