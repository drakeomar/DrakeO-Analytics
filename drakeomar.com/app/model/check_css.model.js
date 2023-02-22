const sql = require("./db.js");

const CheckCSS = function(checkcss){
    CheckCSS.usernum = checkcss.usernum;
    CheckCSS.allowed = checkcss.allowed;
};

CheckCSS.getAll = (id, result) => {

    console.log("new checkcss object to be inserted");
    console.log("sessId in checkcss.model:");
    console.log(id);
    let where_query = `SELECT id FROM users WHERE sessionId = ?;`;
    let where_data = [id];

    let userId;

    sql.query(where_query, where_data, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }else if (typeof res[0] !== 'undefined')
        {
            console.log("found key for checkcss: ", res);
            //result(null, res[0]);
            userId = res[0].id;
            console.log(userId);
            let sql_query = `INSERT INTO check_css (usernum, allowed) VALUES (?,?) ON DUPLICATE KEY UPDATE allowed = ? ;`;
            let data = [userId, 1, 1];

            sql.query(sql_query,data, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created new check img: ", { id: res.insertId });
                result(null, { id: res.insertId });
                return;
            });

        }else {

            result({kind: "not_found"}, null);
            return;
        }
    });
    //let query = `INSERT INTO check_css (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_css;`;
    console.log(userId);

};

CheckCSS.getById = (id, result) =>{
    let query = `SELECT * FROM check_css WHERE id = ${id};`;

    sql.query(query, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (typeof res !== 'undefined')
        {
            console.log("found key: ", res);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

CheckCSS.createNew = (id, result) => {
    //console.log("searching for sessioned information");
    //console.log(newObj);

    //let query = `INSERT INTO check_css (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_css;`;

    let sql_query = `SELECT * FROM check_css WHERE usernum=?`;

    let data = [id];

    sql.query(sql_query,data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("grabbing checkcss object: ", {'id': res.insertId} );
        result(null, res);
    });
};

CheckCSS.delete = (id, result) => {
    let query = `DELETE from check_css WHERE id = ?;`;
    let data = [id]; 

    sql.query(query, data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted keys activity with id: ", id);
        result(null, res);
    });
};

module.exports = CheckCSS;
