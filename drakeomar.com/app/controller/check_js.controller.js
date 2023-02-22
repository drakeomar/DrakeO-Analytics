const CheckJS = require("../model/check_js.model.js");

exports.findAll = (req, res) => {
    let sessId = req.cookies['do-sess-id'];

    CheckJS.getAll(sessId, (err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
            return;
        }else{
            res.status(201).send(data);
            return;
        }
    });
};

exports.create = (req, res) =>{
    //validate
    if (typeof req.body == 'undefined') {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(typeof req.body.usernum == 'undefined'){
        res.status(400).send({
            message: "Request Body missing usernum associated with user data"
        });
        return;
    }
    

    let checkjs = new CheckJS("test");

    checkjs.usernum = req.body.usernum;

    console.log("keydown : ");
    console.log(checkjs);

    CheckJS.createNew(checkjs, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Internal error occurred"
            });
        else res.status(201).send(data);
    });
}