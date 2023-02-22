const Users = require("../model/users.model.js");

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
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(!req.body.sessionId){
        res.status(400).send({
            message: "please enter sessionId for creation"
        })
        return;
    }

    let login_user = new LoginUser("test");

    login_user.sessionId= req.body.sessionId;
    const token = jwt.sign({user_id: "testing"}, 
                            `${process.env.TOKEN_KEY}`,{expiresIn: "5h",});

    console.log("screen width : ");
    console.log(users);

    // Save user in the database
    Users.createNew(users, (err, data) => {
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

exports.update = (req, res) => {
    console.log("controller is updating");
    console.log(req.body);


    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }

    let users = new Users("test");

    console.log("users obj created");
    users.sessionId= req.body.sessionId;

    //input validation by type/existence
    if(typeof users.sessionId == 'undefined'){
        res.status(400).send({
            message: "Request Body Parameter Value Malformed"
        })
        return;
    }

    console.log(!isNaN(users.sessionId));
    console.log(users);

    Users.update(req.params.id, users, (err, data) => {
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
        } else res.send(data);
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
