console.log("App has begun"); 

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

console.log("dependencies acquired"); 

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// adding headers
app.use(function (req, res, next) {


    //res.setHeader('Access-Control-Allow-Origin', 'https://drakeomar.com/');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-HTTP-Method-Override, Accept, Referer, User-Agent, X-Requested-With, origin, Accept-Language, content-type');

    res.setHeader('Accept-Language', '*'); 

    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Cache-Control', 'no-cache'); 

    // Pass to next layer of middleware
    next();
});

//loading environment vars
require("dotenv").config(); 

//api routing
const router = express.Router();

const login_controller = require("./login_users.controller.js");
const checkLogin_controller = require("./check_login.controller.js"); 

//router.get("/login", login_controller.METHOD);

//app.post("/login", checkLogin_controller.checkLogin);

let auth = require("./AuthInterface.js");
const simpleAuth = require("./simpleAuth.js");
//const jwtAuth = require("./jwtAuth.js");

auth = simpleAuth; 
//import simpleAuth from './simpleAuth.js';

//console.log("authentication"); 
//console.log(simpleAuth.generateToken()); 

app.set('views', './views');
app.set("view engine", "ejs"); 


router.get("/test",(req,res) =>{
    res.render('test-index'); 
});

router.get("/temp",(req,res) =>{
    res.render('temp'); 
});

router.get("/users", auth.verify(), (req,res) =>{
    res.render('users'); 
});

//LOGIN ROUTES
router.post("/create/user", auth.generateToken(), checkLogin_controller.createUser);

router.post("/login", auth.generateToken(), checkLogin_controller.checkLogin);

router.get("/login", (req,res) => {
    res.render('login', {"data": null})
});

router.get("/logout", checkLogin_controller.handleLogout);

router.get("/reports/session-activity", auth.verify(), (req,res) => {
    res.render('session-activity'); 
});

router.get("/reports/website-health", auth.verify(), (req,res) => {
    res.render('website-health'); 
});

router.get("/reports/website-performance", auth.verify(), (req,res) => {
    res.render('website-performance'); 
});

/**REVISED REPORTS */
router.get("/reports/traffic", (req,res) => {
    res.render('traffic'); 
});

router.get("/reports/activity", (req,res) => {
    res.render('activity'); 
});

router.get("/reports/performance", (req,res) => {
    res.render('performance'); 
});

//router.get("/logout", checkLogin_controller.handleLogout);


//USER MANAGER ROUTES -- endpoint is randomnized a little
router.get("/man/ad/ad/users", login_controller.findAll); //get all

router.post("/man/ad/ad/users", login_controller.create); //CREATE

router.patch("/man/ad/ad/users/:id", login_controller.update); //UPDATE -- PARTIAL

router.delete("/man/ad/ad/users/:id", login_controller.destroy);
/*
router.get("/man/ad/ad/:id"); //READ

router.post("/man/ad/ad/users/:id"); //UPDATE -- REPLACE OR PARTIAL(CATCHALL)

router.put("/man/ad/ad/:id"); //UPDATE -- REPLACE



router.delete("/man/ad/ad/users"); //DELETE

*/
//index route
router.get("/", auth.verify(), (req, res) => {
    
    console.log("request inserted data in server.js"); 
    console.log(req.admin); 

    if(req.admin){//user is an admin, elevated permissions
        console.log('admin detected'); 
        res.render("test-index-admin");
    }else{ //user is not an admin, show regular dashboard without priveleges
        console.log('regular user detected'); 
        res.render("test-index");
    }
});
 
//router.post("/login/users", login_controller.create);
//router.get("/local/users/:id", login_controller.retrieve);

//domain/api route is already proxied in apache conf file: 
//    a-reporting.drakeomar.com-le-ssl.conf
app.use('/', router);

app.get('*', function(req, res){
    res.render('error'); 
});

// set port, listen for requests
const PORT = process.env.PORT || 9988;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

