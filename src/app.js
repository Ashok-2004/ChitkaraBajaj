const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const logger = require("./utils/logger");

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.get("/health", (req, res) => {
    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in",
    });
  });

  app.use("/", routes);

  app.use((req, res) => {
    res.status(404).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in",
      error: "Not Found",
    });
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    const statusCode = err.statusCode || err.status || 500;
    const isClientError = statusCode >= 400 && statusCode < 500;
    res.status(statusCode).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in",
      error: isClientError ? (err.message || "Bad Request") : "Internal Server Error",
    });
  });

  return app;
};

module.exports = createApp;
