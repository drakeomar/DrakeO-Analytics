const sql = require("./db.js");

const StaticGen = function(staticgen){
  StaticGen.usernum = staticgen.usernum;
  StaticGen.userAgent = staticgen.userAgent;
  StaticGen.lang = staticgen.language;
  StaticGen.connType = staticgen.connType;
  StaticGen.longitude = staticgen.longitude; 
  StaticGen.latitude = staticgen.latitude; 
};

StaticGen.getAll = (result) => {
  let query = "SELECT * FROM static_gen";

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

StaticGen.getById = (id, result) =>{
  let query = `SELECT * FROM static_gen WHERE id = ${id};`;

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
      console.log("found staticGen res: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

StaticGen.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

  if(typeof newObj.userAgent == 'undefined'){
    newObj.userAgent = 'NULL';
  }

  if(typeof newObj.lang == 'undefined'){
    newObj.lang = 'NULL';
  }

  if(typeof newObj.connType == 'undefined'){
    newObj.connType = 'NULL';
  }

	let query = `INSERT INTO static_gen (usernum, userAgent, lang, connType, latitude, longitude) VALUES ( ?, ?, ?, ?, ?, ? );`;
  let data = [newObj.usernum, newObj.userAgent, newObj.lang, newObj.connType, newObj.latitude, newObj.longitude];

  console.log(query);
  sql.query(query, data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Static General Data: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

StaticGen.delete = (id, result) => {
  let query = `DELETE from static_gen WHERE id = ${id};`;

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

StaticGen.update = (id, newObj, result) => {

  /** SQL STRING BUILDING*/
  let arg_count = 0;
  let sql_str = `UPDATE static_gen SET `;

  if (typeof newObj.usernum !== 'undefined'){
    sql_str += `userAgent = '${newObj.usernum}' `;
    arg_count++;
  }

  if (typeof newObj.userAgent !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `lang = '${newObj.userAgent}' `;
    arg_count++;
  }

  if (typeof newObj.lang !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `lang = '${newObj.lang}' `;
    arg_count++;
  }

  if (typeof newObj.connType !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `connType = '${newObj.connType}' `;
    arg_count++;
  }

  sql_str += `WHERE id = ${id}`;

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  let data = [newObj.userAgent, newObj.lang, newObj.connType, id];

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

module.exports = StaticGen;
