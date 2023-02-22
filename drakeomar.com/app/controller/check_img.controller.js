const CheckImg = require("../model/check_img.model.js");

exports.findAll = (req, res) => {
    let sessId = req.cookies['do-sess-id'];

    CheckImg.getAll(sessId, (err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
            return;
        }else{
            res.status(201).send(data);
            return;
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
    }else if(!req.body.usernum){
        res.status(400).send({
            message: "Request Body missing usernum associated with user data"
        });
        return;
    }

    let id = req.body.usernum;

    // Save Tutorial in the database
    CheckImg.createNew(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    //err.message
                    "Server Side Problem was Encountered"
            });
        else res.status(201).send(data);
    });
}

exports.retrieve = (req, res) => {
    let sessId = req.cookies['do-sess-id'];

    CheckImg.getById( sessId, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Allowed CSS with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Allowed CSS with id ${req.params.id} could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else res.send(data);
    });
};
