const {Sequelize} = require("sequelize");
const process = require("dotenv").config();
const userModel = require("../src/models/user");

const sequelize = new Sequelize(process.parsed.DATABASE_NAME, process.parsed.DATABASE_USER, process.parsed.DATABASE_PASSWORD, {
    host:process.parsed.DATABASE_HOST,
    dialect:"mysql",
    logging:false
})

sequelize.sync({force:false}).then(() => {
    console.log("Drop and re-sync db");
})

const models = {
    User:userModel(sequelize, Sequelize.DataTypes)
}

module.exports = {sequelize, models};