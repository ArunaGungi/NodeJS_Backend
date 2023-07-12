const { Op } = require("sequelize");
const { sequelize } = require("../../config/database");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

module.exports = {
  registerUser: async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log("firstname lastname", firstname, lastname);
    var salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(password, salt);
    await sequelize.models.User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
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
    const { firstname, lastname, email, password } = req.body;
    await sequelize.models.User.findOne({
      where: {
        id: id,
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
  getAllUsers: async (req, res) => {
    await sequelize.models.User.findAll()
      .then(async (user) => {
        res.status(200).send({
          code: "200",
          message: "User Data Fetched Successfully",
          data: user,
        });
      })
      .catch((err) => console.log(err));
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    await sequelize.models.User.findOne({
      where: {
        id: id,
      },
    })
      .then((user) => {
        user.destroy({}).then(() => {
          res.status(200).send({
            code: 200,
            message: "User Deleted Successfully",
          });
        });
      })
      .catch((err) =>
        res.status(400).send({
          code: 400,
          message: `Error while deleting the data ${err}`,
        })
      );
  },
  loginValidation: async (req, res) => {
    const { email, password } = req.body;
    await sequelize.models.User.findOne({
      where: {
        email: { [Op.eq]: email },
      },
    })
      .then(async (user) => {
        if (user) {
          console.log(
            "user data check in if condition",
            password,
            user.password
          );
          console.log(
            "decrypted password",
            bcrypt.compareSync(password, user.password)
          );
          if (bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            console.log("token check", token);
            user.dataValues.token = token;
            res.status(200).send({
              code: 200,
              message: "Login Successful",
            });
          }
          else {
            res.status(400).send({
              code: 400,
              message: "Wrong password",
            });
          }
        } else {
          res.status(400).send({
            code: 400,
            message: "User does not exist",
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          code: 400,
          message: err,
        });
      });
  },
};
