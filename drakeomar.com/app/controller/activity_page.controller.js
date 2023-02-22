const ActivityPage = require("../model/activity_page.model.js");

exports.findAll = (req, res) => {
    ActivityPage.getAll((err, data) =>{
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
    }else if(!req.body.enteredPage &&
        !req.body.whichPage){
        res.status(400).send({
            message: "At least one value necessary for object creation is missing"
        })
        return;
    }

    let activitypage= new ActivityPage("test");

    activitypage.usernum = req.body.usernum;
    activitypage.enteredPage = req.body.enteredPage;
    activitypage.leftPage = req.body.leftPage;
    activitypage.whichPage = req.body.whichPage;

    console.log("activity page : ");
    console.log(activitypage);

    // Save Tutorial in the database
    ActivityPage.createNew(activitypage, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.status(201).send({"id":data.id,
            "enteredPage": (data.enteredPage),
            "leftPage": (data.leftPage),
            "whichPage": (data.whichPage)});
    });
}

exports.replace = (req, res) =>{

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
    }else if(!req.body.enteredPage &&
        !req.body.whichPage){
        res.status(400).send({
            message: "At least one value necessary for object creation is missing"
        })
        return;
    }

    let activitypage= new ActivityPage("test");

    activitypage.usernum = req.body.usernum;
    activitypage.enteredPage = req.body.enteredPage;
    activitypage.leftPage = req.body.leftPage;
    activitypage.whichPage = req.body.whichPage;

    console.log("activity page : ");
    console.log(activitypage);

    //Call Model for Database
    ActivityPage.replace(req.params.id, activitypage, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    //err.message
                    "Server Side Error was Encountered"
            });
        else res.status(201).send({"id":data.id,
            "enteredPage": (data.enteredPage),
            "leftPage": (data.leftPage),
            "whichPage": (data.whichPage)});
    });
}

exports.retrieve = (req, res) => {
    ActivityPage.getById(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Page Activity with id ${req.params.id}. could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Page Activity with id ${req.params.id} could not be retrieved from the server.`
                });
                //console.log(err);
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    console.log("controller is updating");
    console.log("PAGE ACTIVITY"); 

    console.log(req.body);


    if (typeof req.body == 'undefined') {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }

    let activitypage = new ActivityPage("test");

    //console.log("activitypage obj created");
    activitypage.enteredPage = req.body.enteredPage;
    activitypage.leftPage = req.body.leftPage;
    activitypage.whichPage = req.body.whichPage;


    console.log("PAGE PARAMS"); 

    console.log(req.params); 

    //input validation by type/existence
    /*if(typeof activitypage.enteredPage == 'undefined' &&
        typeof activitypage.leftPage == 'undefined' &&
        typeof activitypage.whichPage == 'undefined') {
        res.status(400).send({
            message: "Request Body Parameter Value Malformed "+activitypage.leftPage
        })
        return;
    }*/

    //console.log(!isNaN(activitypage.enteredPage));
    console.log(activitypage);

    ActivityPage.update(req.params.id, activitypage, (err, data) => {
        if (err) {
            console.log("error occurred");
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: ` ${req.params.id} could not be found`
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: "Error updating resource with id " + req.params.id
                });
            }
        } else res.send({"id":data.id,
            "enteredPage": (data.enteredPage),
            "leftPage": (data.leftPage),
            "whichPage": (data.whichPage)});
    });
}

exports.destroy = (req, res) => {

    ActivityPage.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User Page Activity with id = ${req.params.id} could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `User Page Activity could not be deleted with id = ${req.params.id}.`
                });

            }} else {
            res.status(204).send({
                message: `User Page Activity Data with requested id deleted successfully!`
            });
        }
    });
}
