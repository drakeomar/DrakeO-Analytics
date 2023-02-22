const sql = require("./db.js");

const Users = function(users){
    Users.sessionId = users.sessionId;
};

Users.getAll = (result) => {
    let query = "SELECT * FROM users";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("testing: ", res);
        result(null, res);
    });
};

Users.getById = (id, result) =>{
    let query = `SELECT * FROM users WHERE id = ?;`;
    let data = [id];

    sql.query(query, data, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (typeof res !== 'undefined')
        {
            console.log("found user: ", res);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Users.createNew = (newObj, result) => {
    console.log("new object to be inserted");
    console.log(newObj);

    let sql_query = `INSERT INTO users (sessionId) VALUES ( ? ) ON DUPLICATE KEY UPDATE id=id;`;
    let data = [newObj.sessionId];

    sql.query(sql_query, data, (err, res) => {
        let retId;

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }



        if(res.insertId == 0) {//object already exists so search and retrieve id for return
            console.log("session already exists, retrieving id from db");
            let sel_query = `SELECT id FROM users WHERE sessionId = ?;`;

            let sel_data = [newObj.sessionId];

            sql.query(sel_query, sel_data, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log(res);
                retId = res[0].id;
                console.log(retId);
                result(null, {id: retId, ...newObj});
                return;
            });
        }else {
            //console.log("response object from mysql insertion:");
            //console.log(res);
            console.log("created user: ", {id: retId, ...newObj});
            result(null, {id: res.insertId, ...newObj});
        }
    });
};

Users.delete = (id, result) => {
    let query = `DELETE from users WHERE id = ?;`;
    let data = [id]; 
    
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id number: ", id);
        result(null, res);
    });
};


Users.update = (id, newObj, result) => {

    /** SQL STRING BUILDING*/
    let arg_count = 0;
    let sql_str = `UPDATE users SET `;

    if (typeof newObj.sessionId !== 'undefined'){
        sql_str += `sessionId = ${newObj.sessionId} `;
    }

    sql_str += `WHERE id = ${id}`;

    /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
    console.log("model object");
    console.log(newObj);
    let data = [newObj.sessionId, newObj.screenHeight, newObj.windowWidth, newObj.windowHeight, id];

    /** QUERY EXECUTION*/
    sql.query(sql_str, data,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {

                result({ kind: "not_found" }, null);
                return;
            }

            console.log("SUCCESS, finally"); 
            console.log("updated user: ", { id: id, ...newObj });
            result(null, { id: id, ...newObj });
        }
    );
};

module.exports = Users;