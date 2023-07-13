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
categoryRouter.get("/getAllCategories", (req,res) => {
    categoryController.getAllCategories(req,res);
})
categoryRouter.put("/updateCategory/:id", (req,res) => {
    categoryController.updateCategory(req,res);
})
categoryRouter.delete("/deleteCategory/:id", (req,res) => {
    categoryController.deleteCategory(req,res);
})

module.exports = {categoryRouter}