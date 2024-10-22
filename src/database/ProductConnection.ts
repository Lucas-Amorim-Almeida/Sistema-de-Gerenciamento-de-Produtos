import { ProductType } from "@/@types/types";
import client from "./client";
import Product from "@/core/Product";
import { Prisma } from "@prisma/client";

export default class ProductConnection {
  public static async createProduct(product: Product) {
    const newProduct = await client.product.create({
      data: product.getProduct() as Omit<ProductType, "id">,
    });
    return newProduct;
  }

  public static async getAllProduct(numProducts: number) {
    if (numProducts <= 0)
      throw new Error("Number of product must be positive.");
    const productList = await client.product.findMany({ take: numProducts });
    return productList;
  }

  public static async findProduct(productName: string, take: number) {
    const productList = await client.product.findMany({
      where: {
        name: {
          contains: productName,
          mode: "insensitive",
        },
      },
      take: take,
    });
    return productList;
  }

  public static async findProductById(id: string) {
    const product = await client.product.findFirst({
      where: { id },
    });

    return product === null
      ? null
      : new Product(
          product.name,
          product.description,
          product.image,
          Number(product.price),
          product.id,
        );
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
    try {
      const updatedProduct = await client.product.update({
        where: { id: productId },
        data: productInfo,
      });
      return updatedProduct;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null; // Retorna null para indicar que o produto não foi encontrado
      }
      throw error; // Relança qualquer outro erro não esperado
    }
  }

  public static async deleteProduct(productId: string) {
    try {
      const deletedProduct = await client.product.delete({
        where: { id: productId },
      });
      return deletedProduct;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null; // Retorna null para indicar que o produto não foi encontrado
      }
      throw error;
    }
  }
}
