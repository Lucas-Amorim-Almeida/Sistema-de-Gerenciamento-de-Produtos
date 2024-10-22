import { Request } from "express";
import { BadRequestError } from "./API_Errors";

const getToken = (req: Request) => {
  const header = req.headers.authorization;

  if (!header) throw new BadRequestError("Header authorization is required.");

  const [, token] = header.split(" ");

  return token;
};

export default getToken;
