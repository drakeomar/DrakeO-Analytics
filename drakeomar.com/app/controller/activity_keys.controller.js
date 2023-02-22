const ActivityKeys = require("../model/activity_keys.model.js");

exports.findAll = (req, res) => {
  ActivityKeys.getAll((err, data) =>{
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
  }else if(!req.body.keydown){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }else if(typeof req.body.timestamp == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
  }

  let activitykeys = new ActivityKeys("test");

  activitykeys.usernum = req.body.usernum;
  activitykeys.keydown = req.body.keydown;
  activitykeys.timestamp = req.body.timestamp; 

  console.log("keydown : ");
  console.log(activitykeys);

  // Save Tutorial in the database
  ActivityKeys.replace(req.params.id, activitykeys, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
        //err.message
            "Server Side Problem was Encountered"
      });
    }else {
      res.status(201).send(data);
    }
  });
}

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
  }else if(!req.body.keydown){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let activitykeys = new ActivityKeys("test");

  activitykeys.usernum = req.body.usernum;
  activitykeys.keydown = req.body.keydown;
  activitykeys.timestamp = req.body.timestamp; 

  console.log("keydown : ");
  console.log(activitykeys);

  // Save Tutorial in the database
  ActivityKeys.createNew(activitykeys, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
        //err.message
            "Server Side Problem was Encountered"
      });
    }else {
      res.status(201).send(data);
    }
  });
}

exports.retrieve = (req, res) => {
  ActivityKeys.getById(req.params.id, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Keys Activity with id ${req.params.id}. could not be found.`
        });
        //console.log(err);
      } else {
        res.status(500).send({

          message: `User Keys Activity with id ${req.params.id} could not be retrieved from the server.`
        });
        //console.log(err);
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  //console.log("controller is updating");
  //console.log("REQUEST BODY TESTING: activity keys");
  //console.log(req.body);


  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
    return;
  }

  let activitykeys = new ActivityKeys("test");

  console.log("activitykeys obj created");
  activitykeys.keydown = req.body.keydown;
  activitykeys.timestamp = req.body.timestamp; 

  //input validation by type/existence
  if(typeof activitykeys.keydown == 'undefined' && req.body) {
    res.status(400).send({
      message: "Request Body Malformed, please provide keydown data"
    })
    return;
  }

  //console.log(!isNaN(activitykeys.keys));
  //console.log(activitykeys);

  ActivityKeys.update(req.params.id, activitykeys, (err, data) => {
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
            message: `Server Side Problem was Encountered when updating resource with id ${req.params.id}`
          });
        }
    } else {
      res.send(data);
    }
  });
}



exports.destroy = (req, res) => {

  ActivityKeys.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Activity Keys with id = ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `User Activity Keys could not be deleted with id = ${req.params.id}.`
        });

    }} else {
        res.status(204).send({
        message: `User Activity Keys data with requested id deleted successfully!`
      });
    }
  });
}
