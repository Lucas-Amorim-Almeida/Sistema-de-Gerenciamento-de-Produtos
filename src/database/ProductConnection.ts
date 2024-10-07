import { ProductType } from "@/@types/types";
import client from "./client";
import Product from "@/core/Product";

export default class ProductConnection {
  public static async createProduct(product: Product) {
    const newProduct = await client.product.create({
      data: product.getProduct() as Omit<ProductType, "id">,
    });
    return newProduct;
  }

  public static async getAllProduct() {
    const productList = await client.product.findMany();
    return productList;
  }

  public static async findProduct(productName: string) {
    const productList = await client.product.findMany({
      where: { name: productName },
    });
    return productList;
  }

  public static async updateProductInfo(
    productId: string,
    productInfo: {
      name?: string;
      image?: string;
      description?: string;
      price?: number;
    },
  ) {
    if (!productInfo || Object.keys(productInfo).length === 0) return;
    const updatedProduct = await client.product.update({
      where: { id: productId },
      data: productInfo,
    });
    return updatedProduct;
  }

  public static async deleteProduct(productId: string) {
    const deletedProduct = await client.product.delete({
      where: { id: productId },
    });
    return deletedProduct;
  }
}
