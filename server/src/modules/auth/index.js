const authRoutes = require("./controller");

const init = async (app) => {
  app.use("/api/auth", authRoutes);
  return app;
};

module.exports = { init };
