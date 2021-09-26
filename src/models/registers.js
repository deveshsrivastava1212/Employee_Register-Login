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
    tokens : [{
        token:{
            type:String,
            required: true
        }
    }]
})

//generating tokens
schema.methods.generateAuthToken = async function () {

    try {
        console.log(this._id)
        const token = await jwt.sign({_id: this._id}, "MyNameIsDeveshSrivastavaIAmABackendDeveloper"); 
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log(this.tokens);
        return token;
    } catch (err) {
        res.status(500).send(err);
        console.log("error happened");
    }
}

//hashing the password
schema.pre("save", async function (next) {

    if(this.isModified("password")) {
        this.password= await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
})

const Register = mongoose.model('Register', schema);

module.exports = Register; 