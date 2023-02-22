const sql = require("./db.js");

const ActivityMouse = function(activitymouse){
  ActivityMouse.usernum = activitymouse.usernum;
  ActivityMouse.cursor_val = activitymouse.cursor_val;
  ActivityMouse.scroll_val = activitymouse.scroll_val;

};

ActivityMouse.getAll = (result) => {
  let query = "SELECT * FROM activity_mouse";

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

ActivityMouse.getById = (id, result) =>{
  let query = `SELECT * FROM activity_mouse WHERE id = ${id};`;

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
      console.log("found mouse activity: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

ActivityMouse.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);
  console.log("new object cursor val");
  console.log(newObj.cursor_val);

  let data = [newObj.usernum];

  let sql_str = `INSERT INTO activity_mouse (usernum, cursor_val, scroll_val) VALUES ( ${newObj.usernum},` ;

  //NULL HANDLING FOR ENTRIES
  if (typeof newObj.cursor_val == 'undefined'){
    sql_str+='NULL, ';
    newObj.cursor_val.X_coord = null;
    newObj.cursor_val.Y_coord = null;
  }else{
    sql_str+=`'${JSON.stringify(newObj.cursor_val)}', `;
    data.push(`{"X_coord": ` + newObj.cursor_val.X_coord + `, "Y_coord": ` + newObj.cursor_val.Y_coord + `}`);
  }

  if (typeof newObj.scroll_val == 'undefined'){
    sql_str+='NULL);';
    let tmp = '{\"Y_coord\":\'NULL\'}';
    newObj.scroll_val = JSON.parse(tmp);
  }else if(typeof newObj.scroll_val.Y_coord !== 'undefined'){
    sql_str+=`'${newObj.scroll_val};)'`;
    data.push(`{"Y_coord": ` + newObj.scroll_val.Y_coord + `}`);
  }

  console.log("SCROLL_VAL");
  console.log(newObj.scroll_val);

  let sql_query = 'INSERT INTO activity_mouse (usernum, cursor_val, scroll_val) VALUES ( ?, ?, ? );';

  console.log(sql_str);


  sql.query(sql_query, data, (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created mouse activity: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

ActivityMouse.delete = (id, result) => {
  let query = `DELETE from activity_mouse WHERE id = ${id};`;

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

    console.log("deleted mouse activity with id: ", id);
    result(null, res);
  });
};

ActivityMouse.replace = (id, newObj, result) => {

  let sql_str = 'UPDATE activity_keys SET usernum = ?, cursor_val = ?, scroll_val = ? WHERE id = ?';
  let data = [newObj.usernum, newObj.cursor_val, newObj.scroll_val, id];
  
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

          console.log("updated mouse activity: ", { id: id, ...newObj });
          result(null, { id: id, ...newObj });
      }
  );
}

ActivityMouse.update = (id, newObj, result) => {

  let sql_str = `UPDATE activity_mouse SET `;
  let data = [];
  //let data = [newObj.breakEnded, newObj.idleTime, id];

  /** SQL STRING BUILDING*/
  let arg_count = 0;

  if (typeof newObj.cursor_val !== 'undefined'){
    sql_str += `cursor_val = ? `;
    data.push(`{"X_coord": ` + newObj.cursor_val.X_coord + `, "Y_coord": ` + newObj.cursor_val.Y_coord + `}`);
    arg_count++;
  }else{
    newObj.cursor_val = null;
  }

  if (typeof newObj.scroll_val !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `scroll_val = ? `;
    data.push(`{"Y_coord": ` + newObj.scroll_val.Y_coord + `}`);
    arg_count++;
  }else{
    newObj.scroll_val = null;
  }

  sql_str += `WHERE id = ?;`;
  data.push(id);

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  //let data = [newObj.cursor_val, newObj.scroll_val, id];

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

      console.log("updated mouse activity: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = ActivityMouse;
