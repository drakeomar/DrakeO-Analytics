const BarObj = require("../model/bar.model.js");

exports.retrieve = (req, res) => {

    console.log("in retrieve function for controller"); 

    BarObj.getBarData((err, data) => {
        
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Bar Graph Data could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `Bar Graph Data with could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            res.send(data);
        }
    });
};