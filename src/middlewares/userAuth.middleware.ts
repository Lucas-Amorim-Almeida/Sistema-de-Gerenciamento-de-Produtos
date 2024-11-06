import UserConnection from "@/database/UserConnection";
import { UnauthorizedError } from "@/utils/API_Errors";
import getToken from "@/utils/getTokenFromHeaders";
import Jsonwebtoken from "@/utils/Jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const encryptedToken = getToken(req);

  const token = Jsonwebtoken.tokenAccessReader(encryptedToken);

  if (!(await UserConnection.getUserById(token.id)))
    throw new UnauthorizedError("Access Unauthorized.");

  req.user = { id: token.id };

  next();
};

export default userAuth;
