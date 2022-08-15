const routes = require("./controller");

const init = async (app) => {
  app.use("/api/v1", routes);
  return app;
};

module.exports = { init };
