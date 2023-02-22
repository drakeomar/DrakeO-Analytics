const ActivityMouse = require("../model/activity_mouse.model.js");

exports.findAll = (req, res) => {
  ActivityMouse.getAll((err, data) =>{
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
  }else if(!req.body.cursor_val && !req.body.scroll_val){
    res.status(400).send({
      message: "At least one value necessary for object creation"
    })
    return;
  }

  let activitymouse = new ActivityMouse("test");

  activitymouse.usernum = req.body.usernum;
  activitymouse.cursor_val = req.body.cursor_val;
  activitymouse.scroll_val = req.body.scroll_val;

  //console.log("activity mouse : ");
  //console.log(activitymouse);

  // Save Tutorial in the database
  ActivityMouse.createNew(activitymouse, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
            //err.message
            `Server Side Problem was Encountered when creating new resource with id = ${activitymouse.usernum}`
      });
    }else {
      res.status(201).send({"id":data.id,
        "cursor_val": (data.cursor_val),
        "scroll_val": (data.scroll_val)});
    }
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
  }else if(!req.body.cursor_val && !req.body.scroll_val){
    res.status(400).send({
      message: "At least one value necessary for object creation"
    })
    return;
  }

  let activitymouse = new ActivityMouse("test");

  activitymouse.usernum = req.body.usernum;
  activitymouse.cursor_val = req.body.cursor_val;
  activitymouse.scroll_val = req.body.scroll_val;

  //console.log("activity mouse : ");
  //console.log(activitymouse);

  // Save Tutorial in the database
  ActivityMouse.replace(req.params.id, activitymouse, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
            //err.message
            `Server Side Problem was Encountered when creating new resource with id = ${activitymouse.usernum}`
      });
    }else {
      res.status(201).send({"id":data.id,
        "cursor_val": (data.cursor_val),
        "scroll_val": (data.scroll_val)});
    }
  });
}

exports.retrieve = (req, res) => {
  ActivityMouse.getById(req.params.id, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Static Dimensions with id ${req.params.id}. could not be found.`
        });
      } else {
        res.status(500).send({
          message: `User Static Dimensions with id ${req.params.id} could not be retrieved from the server.`
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

  let activitymouse = new ActivityMouse("test");

  console.log("activitymouse obj created");
  activitymouse.cursor_val = req.body.cursor_val;
  activitymouse.scroll_val = req.body.scroll_val;

  //input validation by type/existence
  if(typeof activitymouse.cursor_val == 'undefined' &&
     typeof activitymouse.scroll_val == 'undefined') {
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }

  //console.log(!isNaN(activitymouse.cursor_val));
  console.log(activitymouse);

  ActivityMouse.update(req.params.id, activitymouse, (err, data) => {
    if (err) {
      console.log("error occurred");
      console.log(err);
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Mouse Activity with id ${req.params.id}.`
          });
        } else {
          console.log(err);
          res.status(500).send({
            message: `Error updating Mouse Activity with id ${req.params.id}. `
          });
        }
    } else {
      res.send({"id":data.id,
        "cursor_val": (data.cursor_val),
        "scroll_val": (data.scroll_val)});
    }
  });
}

exports.destroy = (req, res) => {

  ActivityMouse.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Mouse Activity with id = ${req.params.id} could not be found.`
        });
      } else {
        res.status(500).send({
          message: `User Mouse Activity could not be deleted with id = ${req.params.id}.`
        });

    }} else {
        res.status(204).send({
        message: `User Mouse Activity info with requested id deleted successfully!`
      });
    }
  });
}
