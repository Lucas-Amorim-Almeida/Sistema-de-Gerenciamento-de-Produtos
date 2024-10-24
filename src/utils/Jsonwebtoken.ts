import * as jwt from "jsonwebtoken";

type JWTPayload = {
  id: string;
};

export default class Jsonwebtoken {
  private static SECRET_ACCESS = process.env.ACCESS_TOKEN_SECRET || "";

  static tokenAccessGenerator(id: string) {
    const token = jwt.sign({ id }, this.SECRET_ACCESS, {
      expiresIn: "1h", //10*60sec = 10min
    });

    return token;
  }

  static tokenAccessReader(token: string) {
    const { id } = jwt.verify(token, this.SECRET_ACCESS) as JWTPayload;
    return { id };
  }
}
