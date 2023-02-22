const ErrorObj = require("../model/errors.model.js");

exports.findAll = (req, res) => {
  ErrorObj.getAll((err, data) =>{
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
  }else if(!req.body.url){
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

  let errorobj = new ErrorObj("test");

  errorobj.usernum = req.body.usernum;
  errorobj.url = req.body.url;
  errorobj.timestamp = req.body.timestamp; 

  console.log("404 url");
  console.log(req.body.url);

  // Save Tutorial in the database
  ErrorObj.createNew(errorobj, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message
      });

    }else res.status(201).send({"id":data.id,"url": data.url, "timestamp": data.timestamp});
    console.log(data.url);
    console.log("json");
    console.log(data.url);
  });
}

exports.retrieve = (req, res) => {
  ErrorObj.getById(req.params.id, (err, data) => {

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
    } else res.send(JSON.parse(data));
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

  let errorobj = new ErrorObj("test");

  console.log("error obj created");
  errorobj.url = req.body.url;
  errorobj.timestamp = req.body.timestamp; 

  //input validation by type/existence
  if(typeof errorobj.url !== 'undefined') {
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }

  //console.log(!isNaN(errorobj.url));
  console.log(errorobj);

  ErrorObj.update(req.params.id, errorobj, (err, data) => {
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
    } else res.send(JSON.parse(data));
  });
}

exports.destroy = (req, res) => {

  ErrorObj.delete(req.params.id, (err, data) => {
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
