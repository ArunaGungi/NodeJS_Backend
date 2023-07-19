const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    }
    catch (err) {
        process.exit(1);
    }
}

module.exports = connectDB;