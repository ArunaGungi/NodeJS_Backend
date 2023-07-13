const { sequelize } = require("../../config/database");

module.exports = {
  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    // console.log("category details", req.body);
    // console.log("sequelize models", sequelize.models);
    await sequelize.models.Categories.create({
      categoryName,
    })
      .then((category) => {
        res.status(200).send({
          code: 200,
          message: "Category added successfully",
          data: category,
        });
      })
      .catch((err) => {
        res.status(400).send({
          code: 400,
          message: err,
        });
      });
  },
  getAllCategories: async (req, res) => {
    await sequelize.models.Categories.findAll()
      .then((categoryData) =>
        res.status(200).send({
          code: "200",
          message: "Category details fetched successfully",
          data: categoryData,
          status: "success",
        })
      )
      .catch((err) =>
        res.status(400).send({
          code: 400,
          message: err,
          status: "failure",
        })
      );
  },
  updateCategory: async (req, res) => {
    console.log("request under update category", req.params.id);
    const id  = req.params.id;
    console.log("category id value", id);
    await sequelize.models.Categories.findOne({
      where: {
        id: id,
      },
    }).then((category) =>
      category
        .update(req.body)
        .then((updatedCategory) => {
          res.status(200).send({
            code: 200,
            message: "Category Details updated successfully",
            data: updatedCategory,
          });
        })
        .catch((err) =>
          res.status(400).send({
            code: 400,
            message: `Could not update ${err}`,
          })
        )
    );
  },
  deleteCategory:async(req,res) => {
    const id = req.params.id;
    await sequelize.models.Categories.findOne({
      where:{
        id:id
      }
    }).then((category) => {
      category.destroy().then((deletedCategory) => {
        res.status(200).send({
          code:200,
          message:"Deleted Category Successfully",
          data:deletedCategory
        })
      }).catch((err) => {
        res.status(400).send({
          code:400,
          message:err
        })
      })
    })
  }
};
