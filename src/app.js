const express = require('express');
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
                // age: req.body.age
            })
            
            const registered = await register.save();
            res.status(201).render("index");

        }else{
            res.send('Password are not matching');
        }
    }catch(err){
        res.status(400).send(err);
    }
});

app.listen( port, ()=>{
    console.log(`Server is running at port ${port}`);
    console.log(`URL is: http://localhost:${port}`);
})