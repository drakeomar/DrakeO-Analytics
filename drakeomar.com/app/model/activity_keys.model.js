const sql = require("./db.js");

const ActivityKeys = function(activitykeys){
  ActivityKeys.usernum = activitykeys.usernum;
  ActivityKeys.keydown = activitykeys.keydown;
  ActivityKeys.timestamp = activitykeys.timestamp; 
};

ActivityKeys.getAll = (result) => {
  let query = "SELECT * FROM activity_keys";

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

ActivityKeys.getById = (id, result) =>{
  let query = `SELECT * FROM activity_keys WHERE id = ?;`;
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

ActivityKeys.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

  //let query = `INSERT INTO activity_keys (usernum, keydown, timestamp) VALUES ( ${newObj.usernum}, '${newObj.keydown}'); describe activity_keys;`;

  let sql_query = `INSERT INTO activity_keys (usernum, keydown, timestamp) VALUES (?,?,?);`;

  let data = [`${newObj.usernum}`, newObj.keydown, newObj.timestamp];

  sql.query(sql_query,data, (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new keys activity: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

ActivityKeys.delete = (id, result) => {
  let query = `DELETE from activity_keys WHERE id = ?;`;
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

ActivityKeys.replace = (id, newObj, result) => {

  let sql_str = 'UPDATE activity_keys SET usernum = ?, keydown = ?, timestamp = ? WHERE id = ?';
  let data = [newObj.usernum, newObj.keydown, newObj.timestamp, id];
  
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

ActivityKeys.update = (id, newObj, result) => {

  /** SQL STRING*/
  let arg_count = 0;
  //let sql_str = `UPDATE activity_keys SET `
  
  let query_str = `UPDATE activity_keys SET `;
  let data = []; 

  let argcount = 0; 

  if(typeof newObj.keydown !== 'undefined'){
    query_str += ` keydown=? `
    data.push(newObj.keydown); 
    argcount++; 
  }else if(typeof newObj.timestamp !== 'undefined'){
    if(argcount>0){
      query_str += ", ";
    }
    query_str += ` timestamp = ?`;
    data.push(newObj.timestamp); 
  }

  data.push(id);  
  
  console.log("model object");
  console.log(newObj);

  query_str += `WHERE id = ?`;

  /** QUERY EXECUTION*/
  sql.query(query_str, data,
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

      console.log("updated keys activity: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = ActivityKeys;
