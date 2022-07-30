const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

require("dotenv").config();

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logPath = process.env.LOG_PATH;
const winstonLogger = createLogger({
  level: "debug",
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.File({
      filename: `${logPath}/logger.log`,
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${logPath}/exceptions.log` }),
  ],
});

module.exports = winstonLogger;
