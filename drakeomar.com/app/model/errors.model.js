const sql = require("./db.js");

const ErrorObj = function(errorobj){
  ErrorObj.usernum = errorobj.usernum;
  ErrorObj.url = errorobj.url;
};

ErrorObj.getAll = (result) => {
  let query = "SELECT * FROM errors";

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

ErrorObj.getById = (id, result) =>{
  let query = `SELECT * FROM errors WHERE id = ?;`;
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
      console.log("found errors object: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

ErrorObj.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

	let query = `INSERT INTO errors (usernum, url, timestamp) VALUES ( '${newObj.usernum}', '${newObj.url}');`;

    let sql_query = `INSERT INTO errors (usernum, url, timestamp) VALUES (?,?,?);`;

    let data = [newObj.usernum, newObj.url, newObj.timestamp];

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

ErrorObj.delete = (id, result) => {
  let query = `DELETE from errors WHERE id = ${id};`;

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

    console.log("deleted keys activity with id: ", id);
    result(null, res);
  });
};


ErrorObj.update = (id, newObj, result) => {

  /** SQL STRING*/
  let arg_count = 0;
  let sql_str = `UPDATE errors SET '?' WHERE id = ?`;
  let data = [newObj.url, id]; 
  console.log("model object");
  console.log(newObj);

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

      console.log("updated errors object: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = ErrorObj;
