const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Devesh:mymongodb@cluster0.5wro2.mongodb.net/Employee_Form?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => { 
    console.log(`Connection Successful`);
}).catch((err) => {
    console.log("no connection");
})