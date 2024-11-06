import "express-async-errors";
import * as express from "express";
import router from "./routes/router";
import { errorsMiddleWare } from "./middlewares/errors.middleware";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../docs/swagger.json";

const app = express();

app.use(express.json());

app.use("/api/v1", router);
// Configuração do Swagger
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    customSiteTitle: "SGP-API: Documentação",
  }),
);

app.use(errorsMiddleWare);

export default app;
