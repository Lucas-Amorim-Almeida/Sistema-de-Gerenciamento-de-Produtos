import Order from "@/core/Order";
import { OrderStatus } from "@/core/OrderStatus.enum";
import OrderConnection from "@/database/OrderConnection";
import ProductConnection from "@/database/ProductConnection";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/utils/API_Errors";
import { orderFormater, orderItemFormater } from "@/utils/formatHelper";
import { Request, Response } from "express";

type ProductListRequest = { product_id: string; quantity: number };

export default class OrderController {
  static async createOrder(req: Request, res: Response) {
    const products: ProductListRequest[] = req.body.products;
    const userID = req.user?.id;

    if (!userID)
      throw new InternalServerError("An Internal server error has occurred.");

    const firstProduct = await ProductConnection.findProductById(
      products[0].product_id,
    );
    if (!firstProduct) throw new BadRequestError("A product is required.");

    const requestOrder = new Order(firstProduct, products[0].quantity, userID);

    if (products.length > 1) {
      for (let i = 1; i < products.length; i++) {
        const product = await ProductConnection.findProductById(
          products[i].product_id,
        );
        if (!product) throw new BadRequestError("A product is required.");

        requestOrder.addProductToOrder(product, products[i].quantity);
      }
    }

    const newOrder = await OrderConnection.createOrder(requestOrder);

    res.status(201).json({ order: orderFormater(newOrder) });
  }

  static async getAllOrders(req: Request, res: Response) {
    const user_id = req.user?.id;
    if (!user_id)
      throw new InternalServerError("An Internal server error has occurred.");

    const orders = await OrderConnection.getOrders(user_id);
    const formatedResponse = orders.map((order) => orderFormater(order));

    res.status(200).json({ orders: formatedResponse });
  }

  static async getOrderById(req: Request, res: Response) {
    const order_id = req.params.order_id;

    const { order_data, order_itens } =
      await OrderConnection.getOrderById(order_id);
    if (!order_data)
      throw new InternalServerError("An Internal server error has occurred.");

    const orderItens = order_itens.map((item) => orderItemFormater(item));

    const formatedResponse = {
      order_data: orderFormater(order_data),
      order_itens: orderItens,
    };

    res.status(200).json(formatedResponse);
  }

  //implementar graus de acessos para usuários para que somente contas de ceto nível possam alterar os
  //status do pedido. Nesse caso, teria que implementar uma espécie de hieraquia de contas.
  static async updateOrderStatus(req: Request, res: Response) {
    const order_id = req.params.order_id;
    const { order_status } = req.body;

    const { order_data } = await OrderConnection.getOrderById(order_id);
    if (!order_data) throw new NotFoundError("Order not found.");

    if (order_data.status === OrderStatus.FINISHED)
      throw new BadRequestError("Order marked as completed.");

    const status =
      Object.values(OrderStatus).find(
        (value) => value === order_status.toLocaleUpperCase(),
      ) || null;

    if (!status) throw new BadRequestError("Order status is invalid.");

    const updatedOrder = await OrderConnection.updateOrderStatus(
      order_id,
      order_status.toLocaleUpperCase(),
    );

    if (!updatedOrder)
      throw new InternalServerError("An Internal server error has occurred.");
    res.status(200).json();
  }

  static async updateOrderRequest(req: Request, res: Response) {
    const order_id = req.params.order_id;
    const products: ProductListRequest[] = req.body.products;

    // busca os produtos do pedido na base de dados
    const { order_itens: dbProductInOrder } =
      await OrderConnection.getOrderById(order_id);

    // Mapeia os produtos recebidos e os existentes para comparação
    const existingMap = new Map(
      dbProductInOrder.map((product) => [product.product_id, product.quantity]),
    );
    const incomingMap = new Map(
      products.map((product) => [product.product_id, product.quantity]),
    );

    // Identifica as operações necessárias
    const toAdd = products.filter(
      (product) => !existingMap.has(product.product_id),
    );

    for (const item of toAdd) {
      if (!(await ProductConnection.findProductById(item.product_id)))
        throw new NotFoundError(`Product ID '${item.product_id}' not found.`);
    }

    const toRemove = dbProductInOrder.filter(
      (product) => !incomingMap.has(product.product_id),
    );
    const toUpdate = products.filter(
      (product) =>
        existingMap.has(product.product_id) &&
        existingMap.get(product.product_id) !== product.quantity,
    );

    await OrderConnection.updateOrderRequest({
      order_id,
      toAdd,
      toRemove,
      toUpdate,
    });

    res.status(200).json();
  }

  static async deleteOrder(req: Request, res: Response) {
    await OrderConnection.deleteOrder(req.params.order_id);
    res.status(200).json();
  }
}
