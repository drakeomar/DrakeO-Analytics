const sql = require("./db.js");

const ActivityIdle = function(activityidle){
    ActivityIdle.usernum = activityidle.usernum;
    ActivityIdle.breakStarted = activityidle.breakStarted;
    ActivityIdle.breakEnded = activityidle.breakEnded;
    ActivityIdle.idleTime = activityidle.idleTime;
};

ActivityIdle.getAll = (result) => {
    let query = "SELECT * FROM activity_idle";

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

ActivityIdle.getById = (id, result) =>{
    let query = `SELECT * FROM activity_idle WHERE id = ?;`;
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
            console.log("found key: ", res);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

ActivityIdle.createNew = (newObj, result) => {
    console.log("new object to be inserted");
    console.log(newObj);

    //let query = `INSERT INTO activity_idle (usernum, breakStarted, breakEnded, idleTime) VALUES ( ${newObj.usernum}, '${newObj.breakEnded}', '${newObj.idleTime}');`;

    let sql_query = `INSERT INTO activity_idle (usernum, breakStarted, breakEnded, idleTime) VALUES (?,?,?,?);`;


    let data = [`${newObj.usernum}`, newObj.breakStarted, newObj.breakEnded, newObj.idleTime];

    sql.query(sql_query, data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new keys activity: ", { id: res.insertId, ...newObj });
        result(null, { id: res.insertId, ...newObj });
    });
};

ActivityIdle.delete = (id, result) => {
    let query = `DELETE from activity_idle WHERE id = ?;`;
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

ActivityIdle.replace = (id, newObj, result) => {

    let sql_str = 'UPDATE activity_idle SET usernum = ?, breakStarted = ?, breakEnded = ?, idleTime = ? WHERE id = ?';
    let data = [`${newObj.usernum}`, newObj.breakStarted, newObj.breakEnded, newObj.idleTime, id];

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

            console.log("updated click activity: ", { id: id, ...newObj });
            result(null, { id: id, ...newObj });
        }
    );
}

ActivityIdle.update = (id, newObj, result) => {

    /** SQL STRING*/
    let arg_count = 0;
    //let sql_str = `UPDATE activity_idle SET '?' '?' WHERE id = ?;`;
    //let data = [newObj.breakEnded, newObj.idleTime, id];
    console.log("model object");
    console.log(newObj);

    let query_str = `UPDATE activity_idle SET`;
    let data = [];
    //let data = [newObj.breakEnded, newObj.idleTime, id];
    let argcount = 0;
    if (typeof newObj.breakEnded !== 'undefined'){
        query_str += ` breakEnded = ?`;
        data.push(newObj.breakEnded);
        argcount++;
    }
    if(typeof newObj.idleTime !== 'undefined'){
        if(argcount>0){
            query_str += `,`;
        }
        query_str += ` idleTime = ?`;
        data.push(newObj.idleTime);
    }
    query_str += ` WHERE id = ?;`;
    data.push(id);

    /** QUERY EXECUTION*/
    sql.query(query_str,data,
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

            console.log("updated idle", { id: id, ...newObj });
            result(null, { id: id, ...newObj });
        }
    );
};

module.exports = ActivityIdle;