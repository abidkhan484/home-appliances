const setup = async () => {
    const app = require("./app");
    const eventEmitter = require("./event-manager").getInstance();
    const connectWithDB = require("./mongo");
    const logger = require("./logger");
    return { app, eventEmitter, connectWithDB, logger }
}

module.exports = { setup };
