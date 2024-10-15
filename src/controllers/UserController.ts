import User from "@/core/User";
import UserConnection from "@/database/UserConnection";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/utils/API_Errors";
import { Request, Response } from "express";

export default class UserController {
  public async createUser(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = new User(username, password);
    await user.hashPassword();

    const newUser = await UserConnection.createNewUser(user);

    res.status(201).json({ user_id: newUser.id });
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const requestUser = new User(username, password);

    const dbUser = await UserConnection.getUser(username);
    if (dbUser === null) throw new NotFoundError("Usuario nao encontrado.");

    if (!(await dbUser.userCompare(requestUser)))
      throw new BadRequestError("Senha incorreta.");

    const dbUserData = dbUser.getUser();
    if (!("id" in dbUserData))
      throw new InternalServerError("Erro interno do servidor.");
    res.status(200).json({ user_id: dbUserData.id });
  }
}
