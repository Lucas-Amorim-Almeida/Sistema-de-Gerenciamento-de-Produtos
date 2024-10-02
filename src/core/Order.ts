import Product from "./Product";
import { OrderStatus } from "./OrderStatus.enum";
import { OrderType } from "@/@types/types";

export default class Order {
  private order: OrderType;

  constructor(product: Product, qty: number, user_id: string, id?: string) {
    if (qty <= 0) throw new Error("Invalid Order.");
    const productData = product.getProduct();
    if (!("id" in productData))
      throw new Error("this product not exists in database.");
    this.order = {
      id: id ? id : "",
      user_id,
      listItens: [
        {
          product: productData,
          quantity: qty,
        },
      ],
      status: OrderStatus.PROCESSING,
    };
  }

  public search(product: Product) {
    const productData = product.getProduct();
    if (!("id" in productData)) return null;
    for (let i = 0; i < this.order.listItens.length; i++) {
      const item = this.order.listItens[i];
      if (item.product.id === productData.id) {
        return { item, index: i };
      }
    }
    return null;
  }

  public addProductToOrder(product: Product, qty: number) {
    if (qty <= 0) return;
    const productData = product.getProduct();
    if (!("id" in productData))
      throw new Error("this product not exists in database.");
    if (this.search(product) !== null) return;
    this.order.listItens.push({ product: productData, quantity: qty });
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

  public getOrder(): OrderType | Omit<OrderType, "id"> {
    const orderInfo = {
      listItens: this.order.listItens,
      status: this.order.status,
      user_id: this.order.user_id,
    };
    return this.order.id === "" ? orderInfo : this.order;
  }
}
