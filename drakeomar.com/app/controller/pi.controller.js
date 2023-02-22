const PiObj = require("../model/pi.model.js");

exports.retrieve = (req, res) => {

    console.log("in retrieve function for controller"); 

    PiObj.getPiData((err, data) => {
        
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pi Chart Data with id could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `Pi Chart Data with id could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
    });
};