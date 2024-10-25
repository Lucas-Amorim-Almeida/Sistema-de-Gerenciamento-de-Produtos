import ProductConnection from "@/database/ProductConnection";
import { NotFoundError, UnauthorizedError } from "@/utils/API_Errors";
import { NextFunction, Request, Response } from "express";

const productAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const product = await ProductConnection.findProductById(id);
  if (!product) throw new NotFoundError(`Product with ID ${id} not found.`);

  const productOwner = product.getProduct().owner_id;

  if (req.user?.id !== productOwner)
    throw new UnauthorizedError(
      "This user is not authorized to access this product.",
    );

  next();
};

export default productAuth;
