import { UserType } from "@/@types/types";

export default class User {
  private user: UserType;
  constructor(username: string, password: string) {
    this.user = {
      id: this.idGenerator(),
      username,
      password,
    };
  }

  private idGenerator() {
    return Math.ceil(Math.random() * 1000000).toString();
  }

  public getUser() {
    return this.user;
  }
}
