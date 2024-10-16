import { UserType } from "@/@types/types";
import Bcrypt from "@/utils/Bcrypt";

export default class User {
  private user: UserType;
  private isHashedPassword: boolean;

  constructor(username: string, password: string, id?: string) {
    //se houver algum id significa que user veio da base de dados que implica que a senha já vai estar hasheada
    //Logo, basta verificar se há um id retornando um valor boolean correspondete para isHashedPassword
    this.isHashedPassword = !!id;
    this.user = {
      id: id ? id : "",
      username,
      password,
    };
  }

  public setId(id: string) {
    if (this.user.id !== "") return;
    this.user.id = id;
  }

  public async hashPassword() {
    if (this.isHashedPassword) return;

    const hashedPassword = await Bcrypt.hashPassword(this.user.password);
    this.user.password = hashedPassword;
    this.isHashedPassword = true;
  }

  public async userCompare(otherUser: User) {
    //se o outro usuário tiver hash como senha: retorna exceção
    if (otherUser.getIsHashedPassword())
      throw new Error("'otherUser' must not have a hashed password.");
    //se este usuário NÃO tiver hash como senha: retorna exceção
    if (!this.isHashedPassword)
      throw new Error("This User instance must have a hashed password.");

    const { password: plainPassword } = otherUser.getUser();
    const comparationResult = await Bcrypt.hashCompare(
      plainPassword,
      this.user.password,
    );

    return comparationResult;
  }

  public getIsHashedPassword(): boolean {
    return this.isHashedPassword;
  }

  public getUser(): UserType | Omit<UserType, "id"> {
    const userInfo = {
      username: this.user.username,
      password: this.user.password,
    };
    return this.user.id === "" ? userInfo : this.user;
  }
}
