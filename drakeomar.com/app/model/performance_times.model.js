const sql = require("./db.js");

const PerfTimes = function(perftimes){
  PerfTimes.usernum = perftimes.usernum;
  PerfTimes.startTime = perftimes.startTime;
  PerfTimes.endTime = perftimes.endTime;
  PerfTimes.totalTime = perftimes.totalTime;
  PerfTimes.whichPage = perftimes.whichPage; 
};

PerfTimes.getAll = (result) => {
  let query = "SELECT * FROM performance_times";

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

PerfTimes.getById = (id, result) =>{
  let sql_query = 'SELECT * FROM performance_times WHERE id = ?;';
  let data = [id];

  sql.query(sql_query, data, (err, res) => {
    console.log(res);
    if (err)
    {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (typeof res !== 'undefined')
    {
      console.log("found Performance Times: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

PerfTimes.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

	let sql_query = `INSERT INTO performance_times (usernum, startTime, endTime, totalTime, whichPage) VALUES ( ?,?,?,?,?);`;
  let data = [newObj.usernum, newObj.startTime, newObj.endTime, newObj.totalTime, newObj.whichPage];

  sql.query(sql_query, data, (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Performance Times: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

PerfTimes.delete = (id, result) => {
  let query = `DELETE from performance_times WHERE id = ?;`;
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

    console.log("deleted Performance Times with id: ", id);
    result(null, res);
  });
};

PerfTimes.replace = (id, newObj, result) => {

  let sql_str = 'UPDATE performance_times SET usernum = ?, startTime = ?, EndTime = ?, totalTime = ?, whichPage = ? WHERE id = ?';
  let data = [`${newObj.usernum}`, newObj.startTime, newObj.EndTime, newObj.totalTime, id];

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

PerfTimes.update = (id, newObj, result) => {

  /** SQL STRING BUILDING*/
  let arg_count = 0;
  let sql_str = `UPDATE performance_times SET `;
  let data = []; 

  if (typeof newObj.startTime !== 'undefined'){

    sql_str += `startTime = ? `;
    data.push(newObj.startTime); 
    arg_count++;
  }

  if (typeof newObj.endTime !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `endTime = ? `;
    data.push(newObj.endTime); 
    arg_count++;
  }

  if (typeof newObj.totalTime !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `totalTime = ? `;
    data.push(newObj.totalTime); 
    arg_count++;
  }

  if (typeof newObj.whichPage !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `whichPage = ? `;
    data.push(newObj.whichPage); 
    arg_count++;
  }

  sql_str += `WHERE id = ?`;
  data.push(id); 

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  //let data = [newObj.startTime, newObj.endTime, newObj.totalTime, id];

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

      console.log("updated Performance Times: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = PerfTimes;
