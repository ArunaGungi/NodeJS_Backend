const express = require("express");
const { getContact, createContact, getContactById, updateContactById, deleteContactById } = require("../controllers/contactsController");
const validateToken = require("../middleware/validateTokenHandler");
const contactsRouter = express.Router();

contactsRouter.route("/").get(getContact).post(createContact);
contactsRouter.route("/:id").get(getContactById).put(updateContactById).delete(deleteContactById);


module.exports = contactsRouter;