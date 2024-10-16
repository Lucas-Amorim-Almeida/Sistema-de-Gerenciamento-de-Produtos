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

    //cria instancia da classe user com as informações vinda via request
    const user = new User(username, password);
    await user.hashPassword();

    //criação de usuário na base de dados
    const newUser = await UserConnection.createNewUser(user);

    //retorna status 201 e id
    res.status(201).json({ user_id: newUser.id });
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const requestUser = new User(username, password);

    //buscando usuário correspondente ao id vindo atravez da request
    const dbUser = await UserConnection.getUser(username);
    if (dbUser === null) throw new NotFoundError("Usuario nao encontrado.");

    //comparação entre a senha vinda pela request com a senha do usuário no banco
    if (!(await dbUser.userCompare(requestUser)))
      throw new BadRequestError("Senha incorreta.");

    //retorna status 200 e id do usuário se as senhas coincidem
    const dbUserData = dbUser.getUser();
    if (!("id" in dbUserData))
      throw new InternalServerError("Erro interno do servidor.");
    res.status(200).json({ user_id: dbUserData.id });
  }

  public async changePassword(req: Request, res: Response) {
    const { password, new_password } = req.body;
    const id = req.params.id;

    //buscando usuário correspondente ao id vindo atravez da request
    const dbUser = await UserConnection.getUserById(id);
    if (dbUser === null) throw new NotFoundError("Usuario nao encontrado.");

    //requestUser: usuário sem username e password e id vindos atravez da request
    const requestUser = new User("", password);
    if (!(await dbUser.userCompare(requestUser)))
      throw new BadRequestError("Senha incorreta.");

    //tempUser: usuário temporário criado para fazer uso do método de hash de senha
    const tempUser = new User("", new_password);
    await tempUser.hashPassword();

    //update da senha no banco de dados
    await UserConnection.updatePassword(id, tempUser.getUser().password);

    res.status(200).json({ message: "Password changed successfully." });
  }

  public async deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    await UserConnection.deleteUser(id);

    res.status(200).json({ message: "User has been deleted successfully." });
  }
}
