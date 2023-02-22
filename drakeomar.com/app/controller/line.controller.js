const LineObj = require("../model/line.model.js");

exports.retrieve = (req, res) => {

    console.log("in retrieve function for controller"); 

    LineObj.getLineData((err, data) => {
        
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Line Data could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `Line Data could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
    });
};