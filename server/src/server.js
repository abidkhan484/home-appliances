const { setup: setupCore } = require("./core");
const { init } = require("./modules");

require("dotenv").config();

const APP_PORT = process.env.APP_PORT || 5000;

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

  try {
    global.__logger = logger;
    await configureRoutes(app);
    app.listen(APP_PORT, async () => {
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
