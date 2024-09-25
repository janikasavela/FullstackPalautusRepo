const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    ...(process.env.NODE_ENV === "test"
      ? []
      : [new winston.transports.Console()]),
    // Voit lisätä tiedostokuljetuksen, jos tarpeen
    // new winston.transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
