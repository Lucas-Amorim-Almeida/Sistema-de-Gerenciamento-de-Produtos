import { ProductType } from "@/@types/types";

export default class Product {
  private product: ProductType;

  constructor(name: string, description: string, price: number) {
    this.product = {
      id: this.idGenerator(),
      name,
      description,
      price,
    };
  }

  private idGenerator(): string {
    return (
      new Date(Date.now()).toString() +
      Math.ceil(Math.random() * 1000).toString()
    );
  }

  public setDecription(description: string) {
    this.product.description = description;
  }

  public setPrice(value: number) {
    if (value < 0) return;
    this.product.price = value;
  }

  public getProduct(): ProductType {
    return this.product;
  }
}
