import { ProductType } from "@/@types/types";

export default class Product {
  private product: ProductType;

  constructor(
    name: string,
    description: string,
    image: string,
    price: number,
    id?: string,
  ) {
    this.product = {
      id: id ? id : "",
      name,
      image,
      description,
      price,
    };
  }

  public setId(productId: string) {
    if (this.product.id !== "") return;
    this.product.id = productId;
  }

  public setDecription(description: string) {
    this.product.description = description;
  }

  public setPrice(value: number) {
    if (value < 0) return;
    this.product.price = value;
  }

  public getProduct(): ProductType | Omit<ProductType, "id"> {
    const productInfo = {
      name: this.product.name,
      image: this.product.image,
      description: this.product.description,
      price: this.product.price,
    };
    return this.product.id === "" ? productInfo : this.product;
  }
}
