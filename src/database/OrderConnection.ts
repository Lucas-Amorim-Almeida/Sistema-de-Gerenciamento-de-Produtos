import Order from "@/core/Order";
import client from "./client";
import { OrderRequestType, OrderType } from "@/@types/types";

export default class OrderConnection {
  public static createOrder(order: Order) {
    const orderData = order.getOrder() as Omit<OrderType, "id">;

    return client.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          status: orderData.status,
          user_id: orderData.user_id,
        },
      });

      if (!newOrder || Object.keys(newOrder).length === 0)
        throw new Error("Error to save new order in database.");

      for (const item of orderData.listItens) {
        const newOrderRequest = await tx.orderRequest.create({
          data: {
            order_id: newOrder.id,
            product_id: item.product.id,
            quantity: item.quantity,
          },
        });
        if (!newOrderRequest || Object.keys(newOrderRequest).length === 0)
          throw new Error("Error to save new order in database.");
      }

      return newOrder;
    });
  }

  public static async getOrders(user_id: string) {
    const ordersList = await client.order.findMany({ where: { user_id } });
    return ordersList;
  }

  public static async updateOrderStatus(orderId: string, orderStaus: string) {
    const updatedOrder = await client.order.update({
      where: { id: orderId },
      data: { status: orderStaus },
    });
    return updatedOrder;
  }

  public static async updateOrderRequest(
    orderId: string,
    newOrderRequest: OrderRequestType[],
  ) {
    return client.$transaction(async (tx) => {
      const deletedRequests = await tx.orderRequest.deleteMany({
        where: { order_id: orderId },
      });

      if (!deletedRequests || Object.keys(deletedRequests).length === 0)
        throw new Error("Error to update order in database.");

      for (const item of newOrderRequest) {
        const updatedItem = await tx.orderRequest.create({
          data: {
            order_id: orderId,
            product_id: item.product.id,
            quantity: item.quantity,
          },
        });

        if (!updatedItem || Object.keys(updatedItem).length === 0)
          throw new Error("Error to update order in database.");
      }
    });
  }

  public static async deleteOrder(orderId: string) {
    const deletedOrder = await client.order.delete({ where: { id: orderId } });
    return deletedOrder;
  }
}
