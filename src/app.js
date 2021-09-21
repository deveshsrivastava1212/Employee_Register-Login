const express = require('express');
const jwt = require('jsonwebtoken');
const path = require("path");
const hbs = require('hbs');
const app = express();

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partial");

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/register', (req, res) => {
    res.render("register");
})

app.get('/login', (req, res) => {
    res.render("login");
})

// create a new user in our database
app.post('/register', async (req, res) => {
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const register = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password:password,
                confirmpassword:cpassword,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
            })

            console.log("the entries "+ register);

            const token = await register.generateAuthToken();
            console.log("the token "+ token);

            const registered = await register.save();
            res.status(201).render("index");

        }else{
            res.send('Password are not matching');
        }
    }catch(err){
        res.status(400).send(err);
        console.log("error page")
    }
});

app.post('/login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email})
        if ( password === useremail.password){
            res.status(201).render("index");
        }
        else {
            res.send("Invalid Email or password")
        }
    }catch(err){
        res.status(400).send(err);
        console.error(err);
    }
})

// Jwt authentication
// const createToken = async() => {
//     const token = await jwt.sign({_id:"6123658d6edae21fac76cd08"}, "helloMyNameIsDeveshSrivastavaIAmABackendDeveloper", {
//         expiresIn: "1 hour"
//     });
//     console.log(token);

//     const userVeri = await jwt.verify(token, "helloMyNameIsDeveshSrivastavaIAmABackendDeveloper")
//     console.log(userVeri);
// }


app.listen( port, ()=>{
    console.log(`Server is running at port ${port}`);
    console.log(`URL is: http://localhost:${port}`);
})