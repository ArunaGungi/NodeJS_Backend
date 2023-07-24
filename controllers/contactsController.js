const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactsModel");

//@desc Get All Contacts
//@route Get /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    console.log("contactscontactscontactscontacts",contacts);
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory");
     }
    else {
        const addContacts = await Contact.create({ name, email, phone, user_id: req.user.id });
        res.status(201).json({ message: addContacts });
    }
})

const getContactById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log("id === contacts", id);
    const contactById = await Contact.findById(id);
    console.log("contact by id", contactById);

    if (!contactById) {
        res.status(404);
        throw new Error("Contact not found");
    }
    else {
        res.status(201).json(contactById);
    }
})

const updateContactById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    else {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: updatedContact });
    }

})

const deleteContactById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    else {
        const deletedContact = await Contact.findByIdAndDelete(id);
        console.log("Deleted Contact Details", deletedContact);
        res.status(200).json({ message: "Successfully Deleted the Contact" });
    }
})

module.exports = { getContact, getContactById, updateContactById, deleteContactById, createContact }