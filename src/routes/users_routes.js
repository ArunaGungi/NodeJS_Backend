const express = require("express");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("../controllers/userController");
userRouter.use(bodyParser.json());
userRouter.use(cors());

userRouter.get("/registration",(req,res) => {
    userController.registerUser(req,res);
});

module.exports = userRouter;