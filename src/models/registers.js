const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

//generating tokens
schema.methods.generateAuthToken = async function () {

    try {
        console.log(this._id)
        const token = await jwt.sign({_id: this._id}, "MyNameIsDeveshSrivastavaIAmABackendDeveloper"); 
        console.log(token);

    } catch (err) {
        res.status(500).send(err);
        console.log("error happened");
    }
}

//hashing the password
schema.pre("save", async function (next) {

    if(this.isModified("password")) {
       console.log(`The current password is ${this.password}`);
        this.password= await bcrypt.hash(this.password, 10);
        console.log(`Now the current password is ${this.password}`);

        this.confirmpassword = undefined;
    }
})

const Register = mongoose.model('Register', schema);

module.exports = Register; 