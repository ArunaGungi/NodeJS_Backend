const { sequelize } = require("../../config/database");

module.exports = {
  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    // console.log("category details", req.body);
    // console.log("sequelize models", sequelize.models);
    await sequelize.models.Categories.create({
      categoryName
    })
      .then((category) => {
        res.status(200).send({
          code: 200,
          message: "Category added successfully",
          data:category 
        });
      })
      .catch((err) => {
        res.status(400).send({
          code: 400,
          message: err,
        });
      });
  },
};
