import Order from "@/core/Order";
import client from "./client";
import { OrderType } from "@/@types/types";
import { OrderStatus } from "@/core/OrderStatus.enum";
import { NotFoundError } from "@/utils/API_Errors";

type ProductListRequest = { product_id: string; quantity: number };

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

  public static async getOrderById(order_id: string) {
    const orderData = await client.order.findUnique({
      where: { id: order_id },
    });

    const ordersList = await client.orderRequest.findMany({
      where: { order_id },
    });
    return { order_data: orderData, order_itens: ordersList };
  }

  public static async updateOrderStatus(
    orderId: string,
    orderStatus: OrderStatus,
  ) {
    const updatedOrder = await client.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });
    return updatedOrder;
  }

  public static async updateOrderRequest(
    order_id: string,
    toAdd: ProductListRequest[],
    toRemove: { product_id: string }[],
    toUpdate: ProductListRequest[],
  ) {
    await client.$transaction(async (tx) => {
      if (toRemove.length > 0) {
        await tx.orderRequest.deleteMany({
          where: {
            order_id,
            product_id: { in: toRemove.map((p) => p.product_id) },
          },
        });
      }

      if (toAdd.length > 0) {
        await tx.orderRequest.createMany({
          data: toAdd.map((p) => ({
            order_id,
            product_id: p.product_id,
            quantity: p.quantity,
          })),
        });
      }

      for (const product of toUpdate) {
        await tx.orderRequest.update({
          where: {
            order_id_product_id: { order_id, product_id: product.product_id },
          },
          data: { quantity: product.quantity },
        });
      }
    });
  }

  public static async deleteOrder(orderId: string) {
    if (!(await client.order.findUnique({ where: { id: orderId } })))
      throw new NotFoundError("Order not found.");

    const deletedOrder = await client.order.delete({ where: { id: orderId } });
    return deletedOrder;
  }
}
