import * as jwt from "jsonwebtoken";

type JWTPayload = {
  id: string;
};

const SECRET_ACCESS = process.env.ACCESS_TOKEN_SECRET || "";

export default class Jsonwebtoken {
  static tokenAccessGenerator(id: string) {
    const token = jwt.sign({ id }, SECRET_ACCESS, {
      expiresIn: "1h", //10*60sec = 10min
    });

    return token;
  }

  static tokenAccessReader(token: string) {
    const { id } = jwt.verify(token, SECRET_ACCESS) as JWTPayload;
    return { id };
  }
}
