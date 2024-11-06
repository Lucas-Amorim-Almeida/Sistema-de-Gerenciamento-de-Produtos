import { ApiError } from "@/utils/API_Errors";
import { NextFunction, Request, Response } from "express";

const errorsMiddleWare = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error.message);
  const statusCode: number = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "A server error occurred.";

  res.status(statusCode).json({ message: message });

  next();
};

export { errorsMiddleWare };
