const mongoose = require("mongoose");

const schema = new mongoose.Schema ({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmpassword: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    // age:{
    //     type:Number,
    //     required: true
    // }
})

// Now we need to create a collection

const Register = mongoose.model('Register', schema);

module.exports = Register; 