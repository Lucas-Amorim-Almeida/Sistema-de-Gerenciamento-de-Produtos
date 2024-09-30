import Product from "./Product";
import { OrderStatus } from "./OrderStatus.enum";
import { OrderType } from "@/@types/types";

export default class Order {
  private order: OrderType;

  constructor(product: Product, qty: number, id?: string) {
    if (qty <= 0) throw new Error("Invalid Order.");

    this.order = {
      id: id,
      listItens: [
        {
          product: product.getProduct(),
          quantity: qty,
        },
      ],
      status: OrderStatus.PROCESSING,
    };
  }

  public search(product: Product) {
    for (let i = 0; i < this.order.listItens.length; i++) {
      const item = this.order.listItens[i];
      if (item.product.id === product.getProduct().id) {
        return { item, index: i };
      }
    }
    return null;
  }

  public addProductToOrder(product: Product, qty: number) {
    if (qty <= 0) return;
    if (this.search(product) !== null) return;
    this.order.listItens.push({ product: product.getProduct(), quantity: qty });
  }

  public removeProductFromOrder(product: Product) {
    const seachInOrderResult = this.search(product);
    const { listItens } = this.order;
    if (seachInOrderResult !== null) {
      const newOrder = listItens.splice(seachInOrderResult.index, 1);
      this.order.listItens = newOrder;
    }
  }

  public updateOrderItem(product: Product, qty: number) {
    if (qty < 0) return;
    if (qty === 0) this.removeProductFromOrder(product);

    const seachInOrderResult = this.search(product);
    if (seachInOrderResult === null) return;

    this.order.listItens[seachInOrderResult.index].quantity = qty;
  }

  public updateOrderStatus(newStatus: OrderStatus) {
    if (
      this.order.status === OrderStatus.CANCELED ||
      this.order.status === OrderStatus.FINISHED
    )
      return;
    this.order.status = newStatus;
  }

  public getOrder() {
    return this.order;
  }
}
