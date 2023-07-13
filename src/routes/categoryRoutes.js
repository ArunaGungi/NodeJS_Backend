const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const categoryController = require("../controllers/categoryController");
const categoryRouter = express.Router();

categoryRouter.use(bodyparser.json());
categoryRouter.use(cors());

categoryRouter.post("/add", (req,res) => {
    categoryController.addCategory(req,res);
})

module.exports = {categoryRouter}