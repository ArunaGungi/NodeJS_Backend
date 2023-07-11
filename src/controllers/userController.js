const { Op } = require("sequelize");
const { sequelize } = require("../../config/database");

module.exports = {
  registerUser: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("req body", req.body);
    var user = await sequelize.models.User.create({
      firstName,
      lastName,
      email,
      password,
    })
      .then((user) => {
        res.status(200).send({
          code: 200,
          message: "User created successfully",
          data: user,
        });
      })
      .catch((error) => {
        res.status(400).send({
          code: 400,
          message: error,
        });
      });
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    console.log("id in update users function", id);
    const { firstName, lastName, email, password } = req.body;
    var user = await sequelize.models.User.findOne({
      where: {
        id:id,
      },
    })
      .then((user) => {
        console.log("user details", user);
        user.update(req.body).then((updateUser) => {
          res.status(200).send({
            code: 200,
            message: "User updated successfully",
            data: updateUser,
          });
        });
      })
      .catch((error) => {
        res.status(400).send({
          code: 400,
          message: `Error while updating user ${error}`,
        });
      });
  },
  getAllUsers:async(req,res) => {
    await sequelize.models.User.findAll().then(async(user) => {
      res.status(200).send(
        {
          code:"200",
          message:"User Data Fetched Successfully",
          data:user
        }
      )
    }).catch((err) =>  console.log(err));
  },

  deleteUser:async(req,res) => {
    const id = req.params.id;
    await sequelize.models.User.findOne({where:{
      id:id
    }}).then((user) => {
      user.destroy({}).then(() => {
        res.status(200).send({
          code:200,
          message:"User Deleted Successfully"
        })
      })
    }).catch((err) => res.status(400).send({
      code:400,
      message:`Error while deleting the data ${err}`
    }))
  }
};
