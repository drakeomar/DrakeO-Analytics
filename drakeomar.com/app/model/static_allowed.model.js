const sql = require("./db.js");

const StaticAllowed = function(staticallowed){
  StaticAllowed.usernum = staticallowed.usernum;
  StaticAllowed.allowJS = staticallowed.allowJS;
  StaticAllowed.allowCSS = staticallowed.allowCSS;
  StaticAllowed.allowImages = staticallowed.allowImages;
  StaticAllowed.acceptCookie = staticallowed.acceptCookie;
};

StaticAllowed.getAll = (result) => {
  let query = "SELECT * FROM static_allowed";

  //if (title) {
  //query += ` WHERE title LIKE '%${title}%'`;
  //}
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

StaticAllowed.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

  if(newObj.allowJS){
    newObj.allowJS = 1; 
  }else{
    newObj.allowJS = 0; 
  }

  if(newObj.allowCSS){
    newObj.allowCSS = 1; 
  }else{
    newObj.allowCSS = 0; 
  }

  if(newObj.allowImages){
    newObj.allowImages = 1; 
  }else{
    newObj.allowImages = 0; 
  }

  if(newObj.acceptCookie){
    newObj.acceptCookie = 1; 
  }else{
    newObj.acceptCookie = 0; 
  }

  let query = `INSERT INTO static_allowed (usernum, allowJS, allowCSS, allowImages, acceptCookies) VALUES ( ?, ?, ?, ?, ?);`;
  let data = [newObj.usernum, newObj.allowJS, newObj.allowCSS, newObj.allowImages, newObj.acceptCookie];

  sql.query(query, data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created static allowed: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

StaticAllowed.delete = (id, result) => {
  let query = `DELETE from static_allowed WHERE id = ?;`;
  let data = [id]; 

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

    console.log("deleted static allowed with id: ", id);
    result(null, res);
  });
};


StaticAllowed.update = (id, newObj, result) => {

  /** SQL STRING BUILDING*/
  let arg_count = 0;
  let sql_str = `UPDATE static_allowed SET `;

  if (typeof newObj.usernum !== 'undefined'){
    sql_str += `usernum = ${newObj.usernum} `;
    arg_count++;
  }

  if (typeof newObj.allowJS !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `allowJS = ${newObj.allowJS} `;
    arg_count++;
  }

  if (typeof newObj.allowCSS!== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `allowCSS= ${newObj.allowCSS} `;
    arg_count++;
  }

  if (typeof newObj.allowImages !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `allowJS = ${newObj.allowImages} `;
    arg_count++;
  }

  if (typeof newObj.acceptCookie !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `allowCSS= ${newObj.acceptCookie} `;
    arg_count++;
  }

  sql_str += `WHERE id = ${id}`;

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  let data = [newObj.usernum, newObj.allowJS, newObj.allowCSS, newObj.allowImages, newObj.acceptCookie, id];

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

        console.log("updated static allowed: ", { id: id, ...newObj });
        result(null, { id: id, ...newObj });
      }
  );
};

module.exports = StaticAllowed;