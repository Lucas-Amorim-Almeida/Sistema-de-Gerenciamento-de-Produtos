import Product from "@/core/Product";
import ProductConnection from "@/database/ProductConnection";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/utils/API_Errors";
import { Request, Response } from "express";
import { pick } from "lodash";

export default class ProductController {
  public static async createProduct(req: Request, res: Response) {
    const requestProduct = new Product({ owner_id: req.user?.id, ...req.body });
    const newProoduct = await ProductConnection.createProduct(requestProduct);

    res.status(201).json(newProoduct);
  }

  public static async getAll(req: Request, res: Response) {
    const qtyProduct: number = Number(req.query.take);
    const products = await ProductConnection.getAllProduct(qtyProduct);

    res.status(200).json({ product_list: products });
  }

  public static async findProduct(req: Request, res: Response) {
    const { product_name, take } = req.query;
    const products = await ProductConnection.findProduct(
      product_name as string,
      Number(take),
    );

    res.status(200).json({ product_list: products });
  }

  public static async updateProduct(req: Request, res: Response) {
    const productId = req.params.id;

    // Define os campos permitidos para o update
    const allowedFields = ["name", "image", "description", "price"];
    // Filtra apenas os campos válidos da requisição
    const productInfo = pick(req.body, allowedFields);

    if (Object.keys(productInfo).length === 0)
      throw new BadRequestError(
        "Request body is empty or contains invalid fields.",
      );

    try {
      const updateResponse = await ProductConnection.updateProductInfo(
        productId,
        productInfo,
      );
      console.log(updateResponse);
      if (updateResponse === null)
        throw new NotFoundError(`Product not found.`);

      res.status(200).json();
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundError(error.message);
      if (error instanceof Error) {
        throw new InternalServerError("An Internal server error has occurred");
      }
    }
  }

  public static async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;

    const deleleResponse = await ProductConnection.deleteProduct(id);
    if (deleleResponse === null) throw new NotFoundError(`Product not found.`);

    res.status(200).json();
  }
}
