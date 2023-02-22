const Users = require("./login_users.model.js");

exports.findAll = (req, res) => {
    Users.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            res.send(data);
        }
    });
};

exports.create = (req, res) =>{
    console.log("CREATE USER REQUEST BODY: "); 
    console.log(req.body);
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(!req.body.username){
        res.status(400).send({
            message: "please enter username for creation"
        });
        return;
    }else if(!req.body.email){
        res.status(400).send({
            message: "please enter email for creation"
        });
        return;
    }else if(!req.body.password){
        res.status(400).send({
            message: "please enter password for creation"
        });
        return;
    }else if(!req.body.token){
        res.status(400).send({
            message: "please enter token for creation"
        });
        return;
    }

    let login_user = new Users("test");

    
    login_user.username = req.body.username; 
    login_user.email= req.body.email;
    login_user.password = req.body.password; 
    login_user.token = req.body.token; 

    //const token = jwt.sign({user_id: "testing"}, 
                           // `${process.env.TOKEN_KEY}`,{expiresIn: "5h",});

    // Save user in the database
    Users.createNew(login_user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else res.status(201).send(data);
    });
}

exports.retrieve = (req, res) => {
    Users.getById(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User with id ${req.params.id} could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else res.send(data);
    });
};

exports.update = ( req, res) => {
    console.log("controller is updating");
    console.log(req.body);

    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }

    let login_user = new Users("test");

    console.log("users obj created");
    login_user.username = req.body.username; 
    login_user.email = req.body.email; 
    login_user.password = req.body.password; 
    login_user.token = req.body.token; 
    login_user.admin = req.body.admin; 

    /*
    //input validation by type/existence
    if(typeof users.sessionId == 'undefined'){
        res.status(400).send({
            message: "Request Body Parameter Value Malformed"
        })
        return;
    }
    */
    let nextFlag = false; 

    //check model 
    Users.getByToken(this.token, function(err, data){
        //console.log("tok");
        //console.log(tok); 

        if(err){
            console.log("Invalid Authentication Token Detected");
            console.log(err); 
            //return res.status(401).send("Token cannot be authenticated"); 
        }else{
            req.notFound = false; 
            console.log("GRABBED DATA");
            console.log(data);
            console.log("found in database");
            //req.admin = data.admin;
            if(!data){
                //this.testFlag = true; 
                req.notFound = true;  
                console.log("test here"); 
                //return res.render('login'); 
                
            }else{
                console.log("database token");
                console.log(data.token); 
                //console.log("my token:");
                //console.log(tok); 

                if(!data.token){
                      //return res.render('login'); 
                }

                req.admin = data.admin;
            }
            
            //return next();  
            if(req.notFound){
                //console.log("current url : " + currentUrl); 
                //let url = {"url":currentUrl};
                //return res.render('login', {"data": encodeURI(JSON.stringify(url))});
            }
        }
        //next(); 
    });
    
    Users.update(req.params.id, login_user, (err, data) => {
        if (err) {
            console.log("error occurred");
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: "Error updating user with id " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
}

exports.destroy = (req, res) => {

    Users.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found with id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `User could not be deleted with id = ${req.params.id}.`
                });

            }} else {
            res.status(204).send({
                message: `User info with requested id deleted successfully!`
            });
        }
    });
}
