const express = require("express");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("../controllers/userController");
userRouter.use(bodyParser.json());
userRouter.use(cors());

userRouter.post("/register",(req,res) => {
    userController.registerUser(req,res);
});
userRouter.put("/updateUser/:id", (req,res) => {
    userController.updateUser(req,res);
})
userRouter.get("/getAllUsers", (req,res) => {
    userController.getAllUsers(req,res);
})
userRouter.delete("/deleteUser/:id", (req,res) => {
    userController.deleteUser(req,res);
})

userRouter.get("/login", (req,res) => {
    userController.loginValidation(req,res);
})

module.exports = userRouter;