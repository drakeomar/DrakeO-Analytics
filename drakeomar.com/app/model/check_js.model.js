const sql = require("./db.js");

const CheckJS = function(checkimg){
    CheckJS.usernum = checkimg.usernum;
    CheckJS.allowed = checkimg.allowed;
};

CheckJS.getAll = (sessId, result) => {

    console.log("new object to be inserted");

    let where_query = `SELECT id FROM users WHERE sessionId = ?;`;
    let where_data = [sessId];

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
            console.log("found key: ", res);
            //result(null, res[0]);
            userId = res[0].id;
            console.log(userId);
            let sql_query = `INSERT INTO check_js (usernum, allowed) VALUES (?,?) ON DUPLICATE KEY UPDATE allowed = ?;`;

            let data = [userId, 1,1];

            sql.query(sql_query,data, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created new check img: ", { id: userId});
                result(null, { id: userId });
                return;
            });

        }else {

            result({kind: "not_found"}, null);
            return;
        }
    });
    //let query = `INSERT INTO check_js (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_js;`;
    console.log(userId);

};


CheckJS.createNew = (id, result) => {
    //console.log("new object to be inserted");
    //console.log(newObj);

    //let query = `INSERT INTO check_js (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_js;`;
    let sql_query = `SELECT * FROM check_js WHERE usernum=?`;

    let data = [id];

    sql.query(sql_query,data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("grabbing checkimg object: ", {'id': res.insertId} );
        result(null, res);
    });
};

module.exports = CheckJS; 