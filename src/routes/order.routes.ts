import OrderController from "@/controllers/OrderController";
import orderAuth from "@/middlewares/orderAuth.middleware";
import { Router } from "express";

const orderRoutes = Router();

orderRoutes.post("/", OrderController.createOrder);

orderRoutes.get("/", OrderController.getAllOrders);
orderRoutes.get(
  "/products_in_order/:order_id",
  orderAuth,
  OrderController.getOrderById,
);

orderRoutes.put("/:order_id", OrderController.updateOrderRequest); //updateOrderRequest *problema nessa rota
orderRoutes.put(
  "/stauts/:order_id",
  orderAuth,
  OrderController.updateOrderStatus,
);

orderRoutes.delete("/:order_id", orderAuth, OrderController.deleteOrder); //deleteOrder

export default orderRoutes;
