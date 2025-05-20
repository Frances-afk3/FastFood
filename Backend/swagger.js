import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");

export default {
  route: "/api-docs",
  middleware: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocument),
};
