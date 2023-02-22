const sql = require("./db.js");

const Perf = function(perf){
  Perf.usernum = perf.usernum;
  Perf.perf = perf.perf;
};

Perf.getAll = (result) => {
  let query = "SELECT * FROM performance";

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

Perf.getById = (id, result) =>{
  let query = `SELECT * FROM performance WHERE id = ${id};`;

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
      console.log("found performance object: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Perf.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

	let query = `INSERT INTO performance (usernum, perf) VALUES ( '${newObj.usernum}', '${newObj.perf}');`;

    let sql_query = `INSERT INTO performance (usernum, perf) VALUES (?,?);`;

    let data = [newObj.usernum, newObj.perf];

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

Perf.delete = (id, result) => {
  let query = `DELETE from performance WHERE id = ${id};`;

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


Perf.update = (id, newObj, result) => {

  /** SQL STRING*/
  let arg_count = 0;
  let sql_str = `UPDATE performance SET '?' WHERE id = ?`;
  let data = [newObj.perf, id]; 
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

      console.log("updated performance object: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = Perf;
