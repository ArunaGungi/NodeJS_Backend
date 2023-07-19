const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the phone number"]
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactsSchema);