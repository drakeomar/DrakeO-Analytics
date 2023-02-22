const sql = require("./db.js");

const CheckImg = function(checkimg){
    CheckImg.usernum = checkimg.usernum;
    CheckImg.allowed = checkimg.allowed;
};

CheckImg.getAll = (sessId, result) => {

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
            let sql_query = `INSERT INTO check_img (usernum, allowed) VALUES (?,?) ON DUPLICATE KEY UPDATE allowed = ?;`;

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
    //let query = `INSERT INTO check_img (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_img;`;
    console.log(userId);

};

CheckImg.createNew = (id, result) => {
    //console.log("new object to be inserted");
    //console.log(newObj);

    //let query = `INSERT INTO check_img (usernum, allowed) VALUES ( ${newObj.usernum}, '${newObj.allowed}'); describe check_img;`;
    let sql_query = `SELECT * FROM check_img WHERE usernum=?`;

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

CheckImg.delete = (id, result) => {
    let query = `DELETE from check_img WHERE id = ?;`;
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


CheckImg.update = (id, newObj, result) => {

    /** SQL STRING*/
    let arg_count = 0;
    let sql_str = `UPDATE check_img SET ? WHERE id = ?`;
    let data = [];
    let query_str = `UPDATE check_img SET `;


    console.log("model object");
    console.log(newObj);

    /** QUERY EXECUTION*/
    sql.query(sql_str,
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

            console.log("updated check_img: ", { id: id});
            result(null, { id: id});
        }
    );
};

module.exports = CheckImg;
