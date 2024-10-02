import { UserType } from "@/@types/types";

export default class User {
  private user: UserType;
  constructor(username: string, password: string, id?: string) {
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

  public getUser(): UserType | Omit<UserType, "id"> {
    const userInfo = {
      username: this.user.username,
      password: this.user.password,
    };
    return this.user.id === "" ? userInfo : this.user;
  }
}
