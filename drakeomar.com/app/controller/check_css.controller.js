const CheckCSS = require("../model/check_css.model.js");

exports.findAll = (req, res) => {
    console.log("cookies:");
    console.log(req.cookies);
    let sessId = req.cookies['do-sess-id'];
    console.log('grabbed session key for checkcss');
    console.log(sessId);

    if(typeof sessId == 'undefined'){
        res.status(400).send({
            message: "Error encountered creating checkcss object: missing sessid"
        })
        return;
    }

    CheckCSS.getAll(sessId, (err, data) =>{
        if (err){
            res.status(500).send({
                message: "SERVER SIDE ERROR ENCOUNTERED"
                //err.message
            });
            return;
        }else{
            res.status(201).send(data);
            return;
        }
    });
};

exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(!req.body.usernum){
        res.status(400).send({
            message: "Request Body missing usernum associated with user data"
        });
        return;
    }

    // let the model do it's work, query the db and return data for the response
    CheckCSS.createNew(req.body.usernum, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                //err.message
                    "Internal error occurred"
            });
        } else {
            res.status(201).send(data);
        }
    });
}

exports.retrieve = (req, res) => {
    let sessId = req.cookies['do-sess-id'];

    if(typeof sessId == 'undefined'){
        res.status(400).send({
            message: "Error encountered creating checkcss object: missing sessid"
        })
    }
    CheckCSS.getById( sessId, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User CheckCSS object could not be created.`
                });
            } else {
                res.status(500).send({
                    message: `User CheckCSS object could not be created on the server side.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    //console.log("controller is updating");
    //console.log(req.body);

    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }

    let checkcss = new CheckCSS("test");

    console.log("checkcss obj created");
    checkcss.keydown = req.body.keydown;

    //input validation by type/existence
    if(typeof checkcss.keydown !== 'undefined' && req.body) {
        res.status(400).send({
            message: "Request Body Malformed"
        })
        return;
    }

    //console.log(!isNaN(checkcss.keys));
    console.log(checkcss);

    CheckCSS.update(req.params.id, checkcss, (err, data) => {
        if (err) {
            console.log("error occurred");
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: "Error updating Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.destroy = (req, res) => {

    CheckCSS.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Static Dimensions not found with id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `User Static Dimensions could not be deleted with id = ${req.params.id}.`
                });

            }} else {
            res.status(204).send({
                message: `User Static General info with requested id deleted successfully!`
            });
        }
    });
}
