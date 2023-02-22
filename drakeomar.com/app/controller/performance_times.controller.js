const PerfTimes = require("../model/performance_times.model.js");

exports.findAll = (req, res) => {
  PerfTimes.getAll((err, data) =>{
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
  }else if(typeof req.body.startTime == 'undefined' || 
           typeof req.body.endTime == 'undefined' || 
           typeof req.body.totalTime == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let perftimes = new PerfTimes("test");

  perftimes.usernum = req.body.usernum;
  perftimes.startTime = req.body.startTime;
  perftimes.endTime = req.body.endTime;
  perftimes.totalTime = req.body.totalTime;
  perftimes.whichPage = req.body.whichPage; 

  console.log(perftimes);

  PerfTimes.createNew(perftimes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "ERROR occurred in creating new entity"
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
  }else if(!req.body.usernum){
    res.status(400).send({
      message: "Request Body missing usernum associated with user data"
    });
    return;
  }else if(typeof req.body.startTime == 'undefined' || 
           typeof req.body.endTime == 'undefined' || 
           typeof req.body.totalTime == 'undefined'){
    res.status(400).send({
      message: "At least one value missing for object creation"
    })
    return;
  }

  let perftimes = new PerfTimes("test");

  perftimes.usernum = req.body.usernum;
  perftimes.startTime = req.body.startTime;
  perftimes.endTime = req.body.endTime;
  perftimes.totalTime = req.body.totalTime;
  perftimes.whichPage = req.body.whichPage; 

  console.log(perftimes);

  PerfTimes.replace(req.params.id, perftimes, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
            //err.message || 
            "ERROR occurred in creating new entity"
      });
    } else {
      res.status(200).send(data);
    }
  });
}

exports.retrieve = (req, res) => {
  PerfTimes.getById(req.params.id, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Performance Times Data with id ${req.params.id}. could not be found.`
        });
      } else {
        res.status(500).send({
          message: `User Performance Times Data with id ${req.params.id} could not be retrieved from the server.`
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

  let perftimes = new PerfTimes("test");

  console.log("perftimes obj created");
  perftimes.startTime = req.body.startTime;
  perftimes.endTime = req.body.endTime;
  perftimes.totalTime = req.body.totalTime;
  perftimes.whichPage = req.body.whichPage; 

  //input validation by type/existence
  if((typeof perftimes.startTime !== 'undefined') ||
      (typeof perftimes.endTime !== 'undefined' )||
      (typeof perftimes.totalTime !== 'undefined')){
    res.status(400).send({
      message: "Request Body Parameter Value Malformed"
    })
    return;
  }

  console.log(!isNaN(perftimes.startTime));
  console.log(perftimes);

  PerfTimes.update(req.params.id, perftimes, (err, data) => {
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

  PerfTimes.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Performance Times not found with id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `User Performance Times could not be deleted with id = ${req.params.id}.`
        });

      }} else {
      res.status(204).send({
        message: `User Performance Times info with requested id deleted successfully!`
      });
    }
  });
}
