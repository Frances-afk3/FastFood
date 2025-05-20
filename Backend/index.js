import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import swagger from "./swagger.js";

// Import routes
import ristorantiRoutes from "./routes/ristoranti.js";
import condimentiRoutes from "./routes/condimenti.js";
import ordiniRoutes from "./routes/ordini.js";
import utentiRoutes from "./routes/utenti.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(logger);

// API routes
app.use("/ristoranti", ristorantiRoutes);
app.use("/condimenti", condimentiRoutes);
app.use("/ordini", ordiniRoutes);
app.use("/user", utentiRoutes);

// Swagger docs
app.use(swagger.route, swagger.middleware, swagger.setup);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server FastFood in ascolto su http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
