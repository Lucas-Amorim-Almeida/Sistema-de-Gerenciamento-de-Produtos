import "express-async-errors";
import * as express from "express";
import router from "./routes/router";
import { errorsMiddleWare } from "./middlewares/errors.middleware";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(errorsMiddleWare);

export default app;
