const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const foodsRouter = require("./routes/foods");
const cultureRouter = require("./routes/culture");
const regionsRouter = require("./routes/regions");
const { notFound, errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan(process.env.NODE_ENV === "test" ? "silent" : "tiny"));

  // Liveness/readiness probes for Kubernetes
  app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
  app.get("/readyz", (req, res) => res.status(200).json({ status: "ready" }));

  app.get("/api", (req, res) => {
    res.json({
      name: "Ethiopian Culture & Cuisine API",
      version: "1.0.0",
      endpoints: ["/api/foods", "/api/culture", "/api/regions"]
    });
  });

  app.use("/api/foods", foodsRouter);
  app.use("/api/culture", cultureRouter);
  app.use("/api/regions", regionsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Ethio culture API listening on port ${port}`);
  });
}
