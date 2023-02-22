const ActivityIdle = require("../model/activity_idle.model.js");

exports.findAll = (req, res) => {
    ActivityIdle.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                //err.message
                "Server Side Problem was Encountered"
            });
        }else{
            res.send(data);
        }
    });
};

exports.replace = (req, res) => {
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
    }else if(!req.body.breakEnded || !req.body.breakStarted || !req.body.idleTime){
        res.status(400).send({
            message: "At least one value missing for object creation"
        })
        return;
    }

    let activityidle = new ActivityIdle("test");

    activityidle.usernum = req.body.usernum;
    activityidle.breakStarted = req.body.breakStarted;
    activityidle.breakEnded = req.body.breakEnded;
    activityidle.idleTime = req.body.idleTime;

    //console.log("breakEnded : ");
    //console.log(activityidle);

    // Save Tutorial in the database
    ActivityIdle.replace(id, activityidle, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    "Server Side Problem was Encountered"
            });
        }else {
            res.status(200).send(data);
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
    }else if(!req.body.breakEnded || !req.body.breakStarted || !req.body.idleTime){
        res.status(400).send({
            message: "At least one value missing for object creation"
        })
        return;
    }

    let activityidle = new ActivityIdle("test");

    activityidle.usernum = req.body.usernum;
    activityidle.breakStarted = req.body.breakStarted;
    activityidle.breakEnded = req.body.breakEnded;
    activityidle.idleTime = req.body.idleTime;

    //console.log("breakEnded : ");
    //console.log(activityidle);

    // Save Tutorial in the database
    ActivityIdle.createNew(activityidle, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    "Server Side Problem was Encountered"
            });
        }else {
            res.status(201).send(data);
        }
    });
}

exports.retrieve = (req, res) => {
    ActivityIdle.getById(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Idle Activity with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Idle Activity with id ${req.params.id} could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
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

    let activityidle = new ActivityIdle("test");

    console.log("activityidle obj created");
    activityidle.breakStarted = req.body.breakStarted;
    activityidle.breakEnded = req.body.breakEnded;
    activityidle.idleTime = req.body.idleTime;


    //console.log(!isNaN(activityidle.keys));
    console.log(activityidle);

    ActivityIdle.update(req.params.id, activityidle, (err, data) => {
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

    ActivityIdle.delete(req.params.id, (err, data) => {
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

