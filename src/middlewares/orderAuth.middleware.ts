import OrderConnection from "@/database/OrderConnection";
import { UnauthorizedError } from "@/utils/API_Errors";
import { NextFunction, Request, Response } from "express";

const orderAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const { order_data } = await OrderConnection.getOrderById(
    req.params.order_id,
  );

  if (order_data?.user_id !== req.user?.id)
    throw new UnauthorizedError(
      "This user does not have access to this order.",
    );

  next();
};

export default orderAuth;
