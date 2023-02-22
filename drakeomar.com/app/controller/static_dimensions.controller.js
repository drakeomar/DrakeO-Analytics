const StaticDim = require("../model/static_dimensions.model.js");

exports.findAll = (req, res) => {
  StaticDim.getAll((err, data) =>{
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
  }else if(!req.body.screenWidth ||
           !req.body.screenHeight ||
           !req.body.windowWidth ||
           !req.body.windowHeight){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }else if(typeof req.body.usernum == 'undefined' ||
      typeof req.body.screenWidth == 'undefined' ||
      typeof req.body.screenHeight == 'undefined' ||
      typeof req.body.windowWidth == 'undefined' ||
      typeof req.body.windowHeight == 'undefined'){
  res.status(400).send({
    message: "At least one value is null for object creation. Please assign a value"
  })
  return;
}

  let staticdim = new StaticDim("test");

  staticdim.usernum = req.body.usernum;
  staticdim.screenWidth = req.body.screenWidth;
  staticdim.screenHeight = req.body.screenHeight;
  staticdim.windowWidth = req.body.windowWidth;
  staticdim.windowHeight = req.body.windowHeight;

  console.log("screen width : ");
  console.log(staticdim);

  // Save Tutorial in the database
  StaticDim.createNew(staticdim, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.status(201).send(data);
  });
}

exports.replace = (req, res) =>{
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
    return;
  }else if(!req.body.screenWidth ||
           !req.body.screenHeight ||
           !req.body.windowWidth ||
           !req.body.windowHeight){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }else if(typeof req.body.usernum == 'undefined' ||
      typeof req.body.screenWidth == 'undefined' ||
      typeof req.body.screenHeight == 'undefined' ||
      typeof req.body.windowWidth == 'undefined' ||
      typeof req.body.windowHeight == 'undefined'){
  res.status(400).send({
    message: "At least one value is null for object creation. Please assign a value"
  })
  return;
  }

  let staticdim = new StaticDim("test");

  staticdim.usernum = req.body.usernum;
  staticdim.screenWidth = req.body.screenWidth;
  staticdim.screenHeight = req.body.screenHeight;
  staticdim.windowWidth = req.body.windowWidth;
  staticdim.windowHeight = req.body.windowHeight;

  console.log("screen width : ");
  console.log(staticdim);

  // Save Tutorial in the database
  StaticDim.replace(req.params.id, staticdim, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          "Some error occurred while creating the Tutorial."
      });
    }else {res.status(201).send(data);
  }
  });
}

exports.retrieve = (req, res) => {
  StaticDim.getById(req.params.id, (err, data) => {

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

  let staticdim = new StaticDim("test");

  console.log("staticdim obj created");
  staticdim.usernum = req.body.usernum;
  staticdim.screenWidth = req.body.screenWidth;
  staticdim.screenHeight = req.body.screenHeight;
  staticdim.windowWidth = req.body.windowWidth;
  staticdim.windowHeight = req.body.windowHeight;

  //input validation by type/existence
  if((typeof staticdim.screenWidth !== 'undefined' && isNaN(staticdim.screenWidth)) ||
     (typeof staticdim.screenHeight !== 'undefined' && isNaN(staticdim.screenHeight))||
     (typeof staticdim.windowWidth !== 'undefined' && isNaN(staticdim.windowWidth)) ||
     (typeof staticdim.windowHeight !== 'undefined' && isNaN(staticdim.windowHeight))){
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }

  console.log(!isNaN(staticdim.screenWidth));
  console.log(staticdim);

  StaticDim.update(req.params.id, staticdim, (err, data) => {
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

  StaticDim.delete(req.params.id, (err, data) => {
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
        message: `User Static Dimensions info with requested id deleted successfully!`
      });
    }
  });
}
