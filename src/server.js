require("dotenv").config();
const createApp = require("./src/app");
const logger = require("./src/utils/logger");

const app = createApp();

// EXPORT FOR VERCEL
module.exports = app;

// Run server only locally
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}
