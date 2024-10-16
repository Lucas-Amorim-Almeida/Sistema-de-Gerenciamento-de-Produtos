import User from "@/core/User";
import client from "./client";
import { UserType } from "@/@types/types";

export default class UserConnection {
  public static async createNewUser(user: User) {
    const newUser = await client.user.create({
      data: user.getUser() as Omit<UserType, "id">,
    });
    return newUser;
  }

  public static async getUser(username: string) {
    const user = await client.user.findUnique({ where: { username } });
    if (user === null) return user;
    return new User(user.username, user.password, user.id);
  }

  public static async getUserById(id: string) {
    const user = await client.user.findUnique({ where: { id } });
    if (user === null) return user;
    return new User(user.username, user.password, user.id);
  }

  public static async updatePassword(userId: string, newPassword: string) {
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
    return updatedUser;
  }

  public static async deleteUser(userId: string) {
    const deletedUser = await client.user.delete({ where: { id: userId } });
    return deletedUser;
  }
}
