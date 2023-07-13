const express = require("express");
const router = express.Router();
const cors = require("cors");
const userRouter = require("./users_routes");
const { categoryRouter } = require("./categoryRoutes");

router.use(cors());

//register user
router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;