const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/current", validateToken, getCurrentUser);

module.exports = userRouter;
