const sql = require("./db.js");
const bcrypt = require('bcrypt'); 

const LoginUser = function(login_user){
    LoginUser.username = login_user.username; 
    LoginUser.email = login_user.email; 
    LoginUser.password = login_user.password; 
    LoginUser.token = login_user.token;
};

LoginUser.getAll = (result) => {
    let query = 'SELECT * FROM login_users';
    
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

LoginUser.getByToken = (token, result) => {
    let query = `SELECT * FROM login_users WHERE token = ?;`;
    let data = [token]; 

    sql.query(query, data, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result( err, null);
            return;
        }
        if (typeof res !== 'undefined')
        {
            console.log("found user: ", res);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

LoginUser.updateTokenByName = (username, token, result) => {
    let sql_str = `UPDATE login_users SET token = ? WHERE username = ?`;
    let data = [token,username];

    console.log(sql_str); 
    console.log(data); 
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

            console.log("updated Token: ", { ...token });
            result(null, {  ...token });
    }
  );
}


LoginUser.updateTokenByEmail = (username, token, result) => {
    let sql_str = `UPDATE login_users SET token = ? WHERE email = ?`;
    let data = [token,username];

    console.log(sql_str); 
    console.log(data); 
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

            console.log("updated Token: ", { ...token });
            result(null, {  ...token });
    }
  );
}

LoginUser.deleteToken = (token, result) => {
    let sql_str = `UPDATE login_users SET token = NULL WHERE token = ?`;
    let data = [token];

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

            console.log("deleted Token: ", { ...token });
            result(null, {  ...token });
    }
  );
}

LoginUser.getByUsername = (username, result) => {
    let query = `SELECT * FROM login_users WHERE username = ?;`;
    let data = [username]; 

    sql.query(query, data, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result( err, null);
            return;
        }
        if (typeof res[0] !== 'undefined')
        {
            console.log("found user: ", res);
            result( null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

LoginUser.getByEmail = (email, result) => {
    let query = `SELECT * FROM login_users WHERE email = ?;`;
    let data = [email]; 

    sql.query(query, data, (err, res) => {
        console.log(res);
        if (err)
        {
            console.log("error: ", err);
            result( err, null);
            return;
        }
        if (typeof res[0] !== 'undefined')
        {
            console.log("found user: ", res);
            result( null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

LoginUser.createNew = ( newObj, result) => {
    console.log("new object to be inserted");
    console.log(newObj);

    //let query = `INSERT INTO activity_idle (usernum, breakStarted, breakEnded, idleTime) VALUES ( ${newObj.usernum}, '${newObj.breakEnded}', '${newObj.idleTime}');`;

    let sql_query = `INSERT INTO login_users (username, email, password, token, admin) VALUES (?,?,?,?,?);`;
    let data = [newObj.username, newObj.email];

    
    //use 13 saltrounds in order to be more secure
    bcrypt.genSalt(13, function(err, salt){
        if(err){
            res.status(500).send("ERROR REGISTERING USER ON SERVER SIDE");
            console.log("error while encrypting password");
            console.log("error : " + err);  
        }
            bcrypt.hash(newObj.password, salt, function(err, hash){

                console.log("HASHED PASSWORD");
                console.log(hash); 
                data.push(hash); 
                newObj.password = hash; 
                loginHelper(); 
        });
    })

    function loginHelper(){
        data.push(newObj.token);     
        data.push(0); 

        sql.query(sql_query, data, function(err, res) {
            if (err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created new user: ", { id: res.insertId, ...newObj });
            result(null, { id: res.insertId, ...newObj });
        });
        
    }

};

LoginUser.update = (id, newObj, result) => {


    let sql_str = `UPDATE login_users SET `;
    let data = []; 
    let arg_count = 0; 

    if (typeof newObj.username !== 'undefined'){

        sql_str += `username = ? `;
        data.push(newObj.username); 
        arg_count++;
    }
    
    if (typeof newObj.email !== 'undefined'){
        if(arg_count > 0){
          sql_str+=", "
        }
        sql_str += `email = ? `;
        data.push(newObj.email); 
        arg_count++;
    }
    
    if (typeof newObj.password !== 'undefined'){
        if(arg_count > 0){
          sql_str+=", "
        }
        sql_str += `password = ? `;
        data.push(newObj.password); 
          arg_count++;
    }

    if (typeof newObj.admin !== 'undefined'){
        if(arg_count > 0){
          sql_str+=", "
        }
        sql_str += `admin = ? `;
        data.push(newObj.admin); 
          arg_count++;
    }

    if (typeof newObj.token !== 'undefined'){
        if(arg_count > 0){
          sql_str+=", "
        }
        sql_str += `token = ? `;
        data.push(newObj.token); 
          arg_count++;
    }
    
    sql_str += `WHERE id = ?`;
    data.push(id); 

    console.log("UPDATE QUERY STRING: ");
    console.log(sql_str); 
    console.log("DATA"); 
    console.log(data); 
    
    /** QUERY EXECUTION*/
    sql.query(sql_str ,data,
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

            console.log("updated user", { id: id, ...newObj });
            result(null, { id: id, ...newObj });
        }
    );
}

LoginUser.delete = (id, result) => {
    let query = `DELETE from login_users WHERE id = ?;`;
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
  
      console.log("deleted mouse activity with id: ", id);
      result(null, res);
    });
  };
module.exports = LoginUser; 