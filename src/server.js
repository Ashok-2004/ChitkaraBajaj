require("dotenv").config();
const createApp = require("./app");
const logger = require("./utils/logger");

const app = createApp();

module.exports = app;

if (process.env.VERCEL !== "1") {
  const PORT = parseInt(process.env.PORT, 10) || 3000;

  const tryListen = (port) => {
    const server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE" && port < 3010) {
        logger.warn(`Port ${port} in use, trying ${port + 1}...`);
        server.close();
        tryListen(port + 1);
      } else {
        throw err;
      }
    });
  };

  tryListen(PORT);
}
