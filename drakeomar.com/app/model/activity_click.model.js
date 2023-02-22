const sql = require("./db.js");

const ActivityClick = function(click_val){
    ActivityClick.usernum = click_val.usernum;
    ActivityClick.click_val = click_val.click_val;
    ActivityClick.timestamp = click_val.timestamp; 
};

ActivityClick.getAll = (result) => {
    let query = "SELECT * FROM activity_click";

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

ActivityClick.getById = (id, result) =>{
    let query = `SELECT * FROM activity_click WHERE id = ?;`;
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
            console.log("found click activity ", res);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

ActivityClick.createNew = (newObj, result) => {
    console.log("new object to be inserted");
    console.log(newObj);

    let sql_query = `INSERT INTO activity_click (usernum, click_val, timestamp) VALUES ( ?,?,?);`;
    let data = [newObj.usernum];
    data.push(`{"X_coord": ` + newObj.click_val.X_coord + `, "Y_coord": ` + newObj.click_val.Y_coord + `, "Mouse_Button": "` + newObj.click_val.mouse_button + `"}`);
    data.push(newObj.timestamp);

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

ActivityClick.delete = (id, result) => {
    let query = `DELETE from activity_click WHERE id = ?;`;
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

ActivityClick.replace = (id, newObj, result) => {

    let sql_str = 'UPDATE activity_click SET usernum = ?, click_val = ?, timestamp = ? WHERE id = ?';
    let data = [newObj.usernum, newObj.click_val, newObj.timestamp, id];
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

ActivityClick.update = (id, newObj, result) => {

    /** SQL STRING*/
    let arg_count = 0;
    let sql_str = `UPDATE activity_click SET`;
    let data = []; 

    if(typeof newObj.click_val !== 'undefined'){
        query_str += ` click_val = ? `
        data.push(newObj.keydown); 
        argcount++; 
      }else if(typeof newObj.timestamp !== 'undefined'){
        if(argcount>0){
          query_str += ", ";
        }
        query_str += ` timestamp = ?`;
        data.push(newObj.timestamp); 
      }
      
      query_str += ` WHERE id = ?`
      data.push(id);  
      
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

            console.log("updated click activity: ", { id: id, ...newObj });
            result(null, { id: id, ...newObj });
        }
    );
};

module.exports = ActivityClick;
