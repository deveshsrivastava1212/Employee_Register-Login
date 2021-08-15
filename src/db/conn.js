const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/formRegister", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => { 
    console.log(`Connection Successful`);
}).catch((err) => {
    console.log("no connection");
})