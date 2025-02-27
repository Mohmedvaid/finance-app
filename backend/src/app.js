import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable Cross-Origin requests
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression for responses
app.use(morgan("dev")); // Logging requests

// ✅ API Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

// ✅ Error Handling Middleware
app.use(notFound); // Handle unknown routes
app.use(errorHandler); // Custom error handling

export default app;
