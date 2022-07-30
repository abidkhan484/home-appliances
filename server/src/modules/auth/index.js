
const init = async (app) => {
  app.use("/auth", (req, res) => {
    res.send("Auth route");
  });
  return app;
};

module.exports = { init };
