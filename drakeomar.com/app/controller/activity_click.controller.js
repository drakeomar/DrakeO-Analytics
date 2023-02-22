const ActivityClick = require("../model/activity_click.model.js");

exports.findAll = (req, res) => {
    ActivityClick.getAll((err, data) =>{
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
    }else if(!req.body.usernum){
        res.status(400).send({
            message: "Request Body missing usernum associated with user data"
        });
        return;
    }else if(!req.body.click_val){
        res.status(400).send({
            message: "At least one value missing for object creation"
        })
        return;
    }else if(!req.body.timestamp){
        res.status(400).send({
            message: "At least one value missing for object creation"
        })
        return;
    }

    let activityclick = new ActivityClick("test");

    activityclick.usernum = req.body.usernum;
    activityclick.click_val = req.body.click_val;
    activityclick.timestamp = req.body.timestamp;

    console.log("click_val : ");
    console.log(activityclick);

    ActivityClick.createNew(activityclick, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Internal error occurred"
            });
        else res.status(201).send({"id": data.id, "usernum": data.usernum, "click_val":(data.click_val)});
    });
}

exports.replace = (req, res) => {

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
    }else if(!req.body.click_val){
        res.status(400).send({
            message: "At least one value missing for object replacement"
        })
        return;
    }else if(!req.body.timestamp){
        res.status(400).send({
            message: "At least one value missing for object replacement"
        })
        return;
    }

    let activityclick = new ActivityClick("test");

    console.log("activityclick obj created");
    activityclick.usernum = req.body.usernum;
    activityclick.click_val = req.body.click_val;
    activityclick.timestamp = req.body.timeclick; 


    ActivityClick.replace(id, activityclick, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Click Value with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Click Value with id ${req.params.id} could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
    });

};

exports.retrieve = (req, res) => {
    ActivityClick.getById(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Click Value with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Click Value with id ${req.params.id} could not be retrieved from the server.`
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

    let activityclick = new ActivityClick("test");

    console.log("activityclick obj created");
    activityclick.usernum = req.body.usernum;
    activityclick.click_val = req.body.click_val;

    //input validation by type/existence
    if(typeof activityclick.click_val == 'undefined' && req.body) {
        res.status(400).send({
            message: "Request Body Malformed"
        })
        return;
    }

    //console.log(!isNaN(activityclick.keys)); <-- only applies to numbers / pure str
    console.log(activityclick);

    ActivityClick.update(req.params.id, activityclick, (err, data) => {
        if (err) {
            console.log("error occurred");
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `The User's Click Activity could not be found with ${req.params.id}.`
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: "Server side issue updating resource with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.destroy = (req, res) => {

    ActivityClick.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Click Value not found with id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `User Click Value could not be deleted with id = ${req.params.id}.`
                });

            }} else {
            res.status(204).send({
                message: `User Click Value with requested id deleted successfully!`
            });
        }
    });
}
