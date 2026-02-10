require("dotenv").config();
const createApp = require("./src/app");
const logger = require("./src/utils/logger");

const app = createApp();

// Export for Vercel (MANDATORY)
module.exports = app;

// Run server ONLY when NOT on Vercel (i.e., local development)
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📧 Official Email: ${process.env.OFFICIAL_EMAIL}`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
