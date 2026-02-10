const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const logger = require("./utils/logger");

const createApp = () => {
  const app = express();

  // Basic security (Vercel-safe)
  app.use(helmet());

  // Simple CORS (Vercel-safe)
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );

  // Body parsing (safe limits)
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Simple request logger (no fs, no files)
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // HEALTH endpoint (minimal, Vercel-safe)
  app.get("/health", (req, res) => {
    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use("/", routes);

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      is_success: false,
      error: "Not Found",
    });
  });

  // Global Error Handler (Vercel-safe)
  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({
      is_success: false,
      error: "Internal Server Error",
    });
  });

  return app;
};

module.exports = createApp;
