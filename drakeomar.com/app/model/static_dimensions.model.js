const sql = require("./db.js");

const StaticDim = function(staticdim){
  StaticDim.usernum = staticdim.usernum;
  StaticDim.screenWidth = staticdim.screenWidth;
  StaticDim.screenHeight = staticdim.screenHeight;
  StaticDim.windowWidth = staticdim.windowWidth;
  StaticDim.windowHeight = staticdim.windowHeight;
};

StaticDim.getAll = (result) => {
  let query = "SELECT * FROM static_dim";

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

StaticDim.getById = (id, result) =>{
  let query = `SELECT * FROM static_dim WHERE id = ${id};`;

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
      console.log("found tutorial: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

StaticDim.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

	let query = `INSERT INTO static_dim (usernum, screenWidth, screenHeight, windowWidth, windowHeight) VALUES ( ${newObj.usernum}, ${newObj.screenWidth}, ${newObj.screenHeight}, ${newObj.windowWidth}, ${newObj.windowHeight});`;

  sql.query(query, (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tutorial: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

StaticDim.delete = (id, result) => {
  let query = `DELETE from static_dim WHERE id = ${id};`;

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

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};


StaticDim.update = (id, newObj, result) => {

  /** SQL STRING BUILDING*/
  let arg_count = 0;
  let sql_str = `UPDATE static_dim SET `;

  if (typeof newObj.usernum !== 'undefined'){
    sql_str += `usernum = ${newObj.usernum} `;
    arg_count++;
  }

  if (typeof newObj.screenWidth !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `screenWidth = ${newObj.screenWidth} `;
    arg_count++;
  }

  if (typeof newObj.screenHeight !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `screenHeight = ${newObj.screenHeight} `;
    arg_count++;
  }

  if (typeof newObj.windowWidth !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `screenWidth = ${newObj.windowWidth} `;
    arg_count++;
  }

  if (typeof newObj.windowHeight !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `screenHeight = ${newObj.windowHeight} `;
    arg_count++;
  }

  sql_str += `WHERE id = ${id}`;

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  let data = [newObj.screenWidth, newObj.screenHeight, newObj.windowWidth, newObj.windowHeight, id];

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

      console.log("updated tutorial: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = StaticDim;
