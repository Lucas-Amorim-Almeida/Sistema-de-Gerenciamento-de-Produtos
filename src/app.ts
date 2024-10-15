import "express-async-errors";
import * as express from "express";
import router from "./routes/router";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

export default app;
