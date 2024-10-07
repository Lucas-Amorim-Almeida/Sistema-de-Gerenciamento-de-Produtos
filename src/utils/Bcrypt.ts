import * as bcrypt from "bcrypt";

export default class Bcrypt {
  public static async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  public static async hashCompare(
    plainPassword: string,
    hashedPassword: string,
  ) {
    const compResult = await bcrypt.compare(plainPassword, hashedPassword);
    return compResult;
  }
}
