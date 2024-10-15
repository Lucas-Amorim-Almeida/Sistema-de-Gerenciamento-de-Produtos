import User from "@/core/User";
import UserConnection from "@/database/UserConnection";
import { Request, Response } from "express";

export default class UserController {
  public async createUser(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = new User(username, password);
    await user.hashPassword();

    const newUser = await UserConnection.createNewUser(user);

    return res.status(201).json({ user_id: newUser.id });
  }
}
