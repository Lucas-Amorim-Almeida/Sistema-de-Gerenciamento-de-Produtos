import { ProductType } from "@/@types/types";

type ProductParams = {
  name: string;
  description: string;
  image: string;
  price: number;
  owner_id: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class Product {
  private product: ProductType;

  constructor(data: ProductParams) {
    this.product = {
      id: data.id ? data.id : "",
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
      owner_id: data.owner_id,
      created_at: data.created_at ? data.created_at : new Date(),
      updated_at: data.updated_at ? data.updated_at : new Date(),
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
      owner_id: this.product.owner_id,
      created_at: this.product.created_at,
      updated_at: this.product.updated_at,
    };
    return this.product.id === "" ? productInfo : this.product;
  }
}
