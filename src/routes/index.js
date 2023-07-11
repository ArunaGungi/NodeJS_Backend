const express = require("express");
const router = express.Router();
const cors = require("cors");
const userRouter = require("./users_routes");

router.use(cors());

//register user
router.use("/user", userRouter);

module.exports = router;