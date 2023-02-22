const Perf = require("../model/performance.model.js");

exports.findAll = (req, res) => {
  Perf.getAll((err, data) =>{
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
  }else if(!req.body.perf){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let perf = new Perf("test");

  perf.usernum = req.body.usernum;
  perf.perf = req.body.perf;
  perf.perf = JSON.stringify(perf.perf)
  console.log("screen width : ");
  console.log(perf);

  // Save Tutorial in the database
  Perf.createNew(perf, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });

    }else res.status(201).send({"id":data.id,"perf": JSON.parse(data.perf)});
    console.log(data.perf);
    console.log("json");
    console.log(JSON.parse(data.perf));
  });
}

exports.retrieve = (req, res) => {
  Perf.getById(req.params.id, (err, data) => {

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

  let perf = new Perf("test");

  console.log("perf obj created");
  perf.perf = req.body.perf;

  //input validation by type/existence
  if(typeof perf.perf !== 'undefined') {
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }

  //console.log(!isNaN(perf.perf));
  console.log(perf);

  Perf.update(req.params.id, perf, (err, data) => {
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

  Perf.delete(req.params.id, (err, data) => {
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
