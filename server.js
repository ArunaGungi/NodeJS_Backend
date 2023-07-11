const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const compression = require("compression");
const helmet = require("helmet");
const database = require("./config/database");
const router = require("./src/routes");

const PORT = 4001 || process.env.PORT;

const app = express();

var corOptions = {
  origin: "",
  optionsSuccessStatus: 200,
};

const init = async () => {
  try {
    await database.sequelize.authenticate();
    console.log("connected to mysql");
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cors(corOptions));

    //call the main router
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log("server is running on the port", PORT);
    });
  } catch (err) {
    console.log("error while conecting to database", err);
  }
};

init();
