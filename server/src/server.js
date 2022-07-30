const { setup: setupCore } = require("./core");
const { init } = require("./modules");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  const initModules = async (app) => {
    const app2 = await init(app);
    return app2;
  };

  const configureRoutes = async (app) => {
    // app.use(handleRequest);
    const app2 = await initModules(app);
    app2.get("/", (req, res) => {
      logger.info("logger setup successful.");
      res.send("Hello World!");
    });
    // app2.use(handleError);
    return app2;
  };

  const { app, eventEmitter, connectWithDB, logger } = await setupCore();

  // app.get("/", (req, res) => {
  //   logger.info("logger setup successful.");
  //   res.send("Hello World!");
  // });

  try {
    await configureRoutes(app);
    app.listen(PORT, async () => {
      const broadcastDatabaseConnectionEstablished = (em) => {
        em.emit("broadcastDatabaseConnectionEstablished");
      };

      await connectWithDB(broadcastDatabaseConnectionEstablished, eventEmitter);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
