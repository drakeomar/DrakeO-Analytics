const StaticGen = require("../model/static_general.model.js");

exports.findAll = (req, res) => {
  StaticGen.getAll((err, data) =>{
    if (err){
      res.status(500).send({
        message: err.message
      });
    }else{
      res.send(data);
    }
  });
};

exports.create = (req, res) =>{
  /**
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
  }else if(!req.body.userAgent){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
  }
  */

  let staticgen = new StaticGen("test");

  /**MYSQL NULL HANDLING*/

  staticgen.usernum = req.body.usernum;
  staticgen.userAgent = req.body.userAgent;
  staticgen.lang = req.body.lang;
  staticgen.connType = req.body.connType;
  staticgen.latitude = req.body.latitude; 
  staticgen.longitude = req.body.longitude; 

  //console.log("screen width : ");
  //console.log(staticgen);


  StaticGen.createNew(staticgen, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occurred while creating the StaticGen."
      });
    }
    else res.status(201).send(data);
  });
}

exports.replace = (req, res) =>{
  /**
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
  }else if(!req.body.userAgent){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
  }
  */

  let staticgen = new StaticGen("test");

  /**MYSQL NULL HANDLING*/

  staticgen.usernum = req.body.usernum;
  staticgen.userAgent = req.body.userAgent;
  staticgen.lang = req.body.lang;
  staticgen.connType = req.body.connType;

  console.log("screen width : ");
  console.log(staticgen);


  StaticGen.replace(staticgen, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occurred while creating the StaticGen."
      });
    }
    else res.status(201).send(data);
  });
}

exports.retrieve = (req, res) => {
  let cookie_value = req.cookies['do-sess-id'];
  console.log("Cookie Value retrieved by server-side nodejs");
  console.log(cookie_value);
  StaticGen.getById(req.params.id, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Static General info with id ${req.params.id}. could not be found.`
        });
      } else {
        res.status(500).send({
          message: `User Static General info with id ${req.params.id} could not be retrieved from the server.`
        });
      }
    } else res.send(data);
  });
};

exports.destroy = (req, res) => {

  StaticGen.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Static General info not found with id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `User Static General info could not be deleted with id = ${req.params.id}.`
        });
      }
    } else res.status(204).send({
        message: `User Static General info with requested id deleted successfully!`
    });
  });
}

exports.update = (req, res) => {
  console.log("controller is updating");
  console.log(req.body);


  if (!req.body) {
    res.status(400).send({
      message: "Request Body cannot be empty"
    });
    return;
  }

  let staticgen = new StaticGen("test");

  console.log("staticgen obj created");
  staticgen.usernum = req.body.usernum;
  staticgen.userAgent = req.body.userAgent;
  staticgen.lang = req.body.lang;
  staticgen.connType = req.body.connType;

/**
  //input validation by type/existence
  if((typeof staticgen.userAgent !== 'undefined' && isNaN(staticgen.userAgent)) ||
     (typeof staticgen.lang !== 'undefined' && isNaN(staticgen.lang))||
     (typeof staticgen.connType !== 'undefined' && isNaN(staticgen.connType)) ||
     (typeof staticgen.windowHeight !== 'undefined' && isNaN(staticgen.windowHeight))){
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }
*/
  //console.log(!isNaN(staticgen.userAgent));
  console.log(staticgen);

  StaticGen.update(req.params.id, staticgen, (err, data) => {
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
