const StaticAllowed = require("../model/static_allowed.model.js");

exports.findAll = (req, res) => {
  StaticAllowed.getAll((err, data) =>{
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

exports.replace = (req, res) =>{
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
    return;
  }else if(typeof req.body.acceptCookies == 'undefined' || 
           typeof req.body.allowJS == 'undefined' || 
           typeof req.body.allowCSS == 'undefined' || 
           typeof req.body.allowImg == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let staticallowed = new StaticAllowed("test");

  staticallowed.usernum = req.body.usernum;
  staticallowed.acceptCookie = req.body.acceptCookies;
  staticallowed.allowJS = req.body.allowJS;
  staticallowed.allowCSS = req.body.allowCSS;
  staticallowed.allowImages = req.body.allowImg;

  console.log("screen width : ");
  console.log(staticallowed);

  //call model
  StaticAllowed.replace(req.params.id, staticallowed, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          "SERVER SIDE ERROR was Encountered."
      });
    else res.status(201).send(data);
  });
}

exports.create = (req, res) =>{
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
    return;
  }else if(typeof req.body.acceptCookies == 'undefined' || 
           typeof req.body.allowJS == 'undefined' || 
           typeof req.body.allowCSS == 'undefined' || 
           typeof req.body.allowImg == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let staticallowed = new StaticAllowed("test");

  staticallowed.usernum = req.body.usernum;
  staticallowed.acceptCookie = req.body.acceptCookies;
  staticallowed.allowJS = req.body.allowJS;
  staticallowed.allowCSS = req.body.allowCSS;
  staticallowed.allowImages = req.body.allowImg;

  console.log("static allowed : ");
  console.log(staticallowed);


  StaticAllowed.createNew(staticallowed, (err, data) => {
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
  }else if(typeof req.body.acceptCookies == 'undefined' || 
           typeof req.body.allowJS == 'undefined' || 
           typeof req.body.allowCSS == 'undefined' || 
           typeof req.body.allowImg == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let staticallowed = new StaticAllowed("test");

  staticallowed.usernum = req.body.usernum;
  staticallowed.acceptCookie = req.body.acceptCookies;
  staticallowed.allowJS = req.body.allowJS;
  staticallowed.allowCSS = req.body.allowCSS;
  staticallowed.allowImages = req.body.allowImg;

  console.log("static allowed : ");
  console.log(staticallowed);


  StaticAllowed.replace(req.params.id, staticallowed, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          //err.message || 
          "Some error occurred while creating the Tutorial."
      });
    else res.status(200).send(data);
  });
}

exports.retrieve = (req, res) => {
  StaticAllowed.getById(req.params.id, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Static Allowed Data with id ${req.params.id}. could not be found.`
        });
      } else {
        res.status(500).send({
          message: `User Static Allowed Data with id ${req.params.id} could not be retrieved from the server.`
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

  let staticallowed = new StaticAllowed("test");

  console.log("staticallowed obj created");
  staticallowed.usernum = req.body.usernum;
  staticallowed.acceptCookies = req.body.acceptCookies;
  staticallowed.allowJS = req.body.allowJS;
  staticallowed.allowCSS = req.body.allowCSS;
  staticallowed.allowImages = req.body.allowImages;

/**
  //input validation by type/existence
  if((typeof staticallowed.acceptCookies !== 'undefined' && isNaN(staticallowed.acceptCookies)) ||
     (typeof staticallowed.allowJS !== 'undefined' && isNaN(staticallowed.allowJS))||
     (typeof staticallowed.allowCSS !== 'undefined' && isNaN(staticallowed.allowCSS)) ||
     (typeof staticallowed.allowImages !== 'undefined' && isNaN(staticallowed.allowImages))){
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }
*/
  console.log(!isNaN(staticallowed.acceptCookies));
  console.log(staticallowed);

  StaticAllowed.update(req.params.id, staticallowed, (err, data) => {
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

  StaticAllowed.delete(req.params.id, (err, data) => {
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
