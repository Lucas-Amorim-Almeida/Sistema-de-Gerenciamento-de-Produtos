import OrderController from "@/controllers/OrderController";
import { Router } from "express";

const orderRoutes = Router();

orderRoutes.post("/", OrderController.createOrder);

orderRoutes.get("/:user_id", OrderController.getAllOrders);
orderRoutes.get("/product/:order_id", OrderController.getOrderById);

orderRoutes.put("/:order_id", OrderController.updateOrderRequest); //updateOrderRequest *problema nessa rota
orderRoutes.put("/stauts/:order_id", OrderController.updateOrderStatus);

orderRoutes.delete("/:order_id", OrderController.deleteOrder); //deleteOrder

export default orderRoutes;
