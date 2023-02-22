console.log("App has begun"); 

const express = require("express");
//const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

console.log("dependencies acquires"); 
//var corsOptions = {
//origin: "http://localhost:63342"
//};

//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Add headers before the routes are defined
app.use(function (req, res, next) {


    res.setHeader('Access-Control-Allow-Origin', 'https://reporting.drakeomar.com');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-HTTP-Method-Override, Accept, Referer, User-Agent, X-Requested-With, origin, Accept-Language, content-type');

    res.setHeader('Accept-Language', '*'); 

    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Cache-Control', 'no-cache'); 

    // Pass to next layer of middleware
    next();
});

require("dotenv").config(); 



require("./controller/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
