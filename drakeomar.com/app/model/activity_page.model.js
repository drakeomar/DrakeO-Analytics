const sql = require("./db.js");
const mysql = require("mysql");
const dbConfig = require("./db.config.js");
// First utilize local mysql server, then migrate, test with DBAAS
const connection = mysql.createConnection({
  host: dbConfig.RHOST,
  user: dbConfig.RUSER,
  password: dbConfig.RPASSWORD,
  port: dbConfig.RPORT,
  database: dbConfig.RDB,
  insecureAuth: true
});

function getResult(sql){
  return new Promise(function(resolve,reject){
    pool.query(sql, function(err, result){
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
var pool = mysql.createPool(connection);

const ActivityPage = function(activitypage){
  ActivityPage.usernum = activitypage.usernum;
  ActivityPage.enteredPage = activitypage.enteredPage;
  ActivityPage.leftPage = activitypage.leftPage;
  ActivityPage.whichPage = activitypage.whichPage;
};

ActivityPage.getAll = function(result){
  let query = "SELECT * FROM activity_page";

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

ActivityPage.getById = (id, result) =>{
  let query = `SELECT * FROM activity_page WHERE id = ?;`;
  let data = [id]; 

  sql.query(query,data, (err, res) => {
    console.log(res);
    if (err)
    {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (typeof res !== 'undefined')
    {
      console.log("found page activity: ", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

ActivityPage.getBounceData = (result) => {
  let bounceCountMap = new Map(); 
  let bounceRateMap = new Map(); 
  let totalMap = new Map(); 
  let dataArr = []; //STORE ALL DATA FROM GET ALL REQUEST
  let whichPage = new Map(); //all unique pages and their totals
  let userNumArr = []; 
  
  //get all page data

    //get all page data by usernum 

        //if page data was entered within last 7 days

            //if number of page data objects == 1 or all "whichPage" are the same, 
                //then count as bounce : update bounceCount++ in bounceCountMap (key is whichPage)
                //increment total in totalMap (key is whichPage)
            //else 
                //then DONT count as bounce
                //increment total 

        //for each (key, value) in bounceCountMap (and totalMap)
                //bounceRate = bounceCount / total (key is whichPage from each entry); 
                //place bounceRate in bounceRateMap with same key
    
    //for each entry in bounceCountMap
        //use to calculate TOTALBOUNCERATE

    //return bounceRateMap and TOTALBOUNCERATE
  let all_page_query = "SELECT * FROM activity_page";
  let usernum_query = `SELECT * FROM activity_page WHERE usernum = ?;`;

  /*
  pool.query(all_page_query, async function(err, result) {
    if (err) throw err;
    console.log(result); 
    for (var i = 0; i < result.length; i++) {
      var res = await getResult(sql)
      console.log(res[0]);
        
    };
    pool.end()
  });
  */
  //console.log("POOL ENDED"); 

  sql.query(all_page_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    for(let j in res){
      //insert all into pageArr;
      dataArr.push[res[j]];
    }

    

    /* 

    //get all page data by usernum 
    console.log("GET BY USERNUM"); 
    //console.log(res); 
    let objCount = 0; 
    let whichPage = [];

    for(let i in res){

      let data = [res[i]["usernum"]];
      
      
      sql.query(usernum_query,data, function(err, res){
        //console.log(res);
        if (err)
        {
          console.log("error: ", err);
          //result(err, null);
          //return;
        }
        if (typeof res !== 'undefined')
        {
          for( let j in res){
            if(res[j]["whichPage"]){
            
              //console.log(res[j]["whichPage"]);
              
                      
              whichPage.push(res[j]["whichPage"]);
              objCount++; 
            }
          }
          
          
          //console.log("found page activity: ", res);
          /**FOUND -- MANIPULATE DATA 

          //if entered in the last 7 days
          
          if(whichPage.length > 0){
            let test1 = whichPage.every( (val, i, arr) => val === arr[0] );
            let test = !!whichPage.reduce(function(a, b){ return (a === b) ? a : NaN; });
            if(objCount == 1 || test1) {
                if(bounceCountMap.has(whichPage[0])){
                    console.log(test1);
                    tmp = bounceCountMap.get(whichPage[0]); 
                    console.log("TMP COUNT"); 
                    console.log(whichPage[0]);
                    console.log(tmp); 
                    bounceCountMap.set(whichPage[0], tmp + 1);
                }else{
                    bounceCountMap.set(whichPage[0], 1); 
                }
                
            }

            if(totalMap.has(whichPage[0])){
                tmp = totalMap.get(whichPage[0]); 
                totalMap.set(whichPage[0], tmp + 1);
            }else{
                totalMap.set(whichPage[0], 1); 
            }


            //reset whichpage array 
            whichpage = []; 
            objCount = 0; 
            tmp = 0; 
          }
          //console.log(bounceCountMap); 
          //console.log(bounceRateMap);


          //result(null, res);
          
        }
        
        //result({ kind: "not_found" }, null);
      });




      
      
      

    }
     
    
    //onsole.log("WHICHPAGE");
    //console.log(whichPage); 
            
    
    */


    //console.log("testing: ", res);
    result(null, res);
  });

};

ActivityPage.getByUsernum = function(usernum, result) {
  let query = `SELECT * FROM activity_page WHERE usernum = ?;`;
  let data = [usernum]; 

  sql.query(query,data, function(err, res){
    console.log(res);
    if (err)
    {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (typeof res !== 'undefined')
    {
      console.log("found page activity: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

ActivityPage.createNew = (newObj, result) => {
  console.log("new object to be inserted");
  console.log(newObj);

	//let query = `INSERT INTO activity_page (usernum, enteredPage, leftPage, whichPage) VALUES ( ${newObj.usernum}, ${newObj.enteredPage}, ${newObj.leftPage}, ${newObj.whichPage});`;

  let sql_query = `INSERT INTO activity_page (usernum, enteredPage, whichPage) VALUES ( ?,?,?);`;
  let data = [newObj.usernum, newObj.enteredPage, newObj.whichPage];
  
  sql.query(sql_query, data, (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created page activity: ", { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};

ActivityPage.delete = (id, result) => {
  let query = `DELETE from activity_page WHERE id = ?;`;
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

    console.log("deleted page activity with id: ", id);
    result(null, res);
  });
};


ActivityPage.update = (id, newObj, result) => {

  /** SQL STRING BUILDING*/
  let arg_count = 0;
  let sql_str = `UPDATE activity_page SET `;
  let data = []; 

  if (typeof newObj.usernum !== 'undefined'){
    sql_str += `usernum = ? `;
    data.push(newObj.usernum); 
    arg_count++;
  }

  if (typeof newObj.enteredPage !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `enteredPage = ?`;
    data.push(newObj.enteredPage); 
    arg_count++;
  }

  if (typeof newObj.leftPage !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `leftPage = ? `;
    data.push(newObj.leftPage); 
    arg_count++;
  }

  if (typeof newObj.whichPage !== 'undefined'){
    if(arg_count > 0){
      sql_str+=", "
    }
    sql_str += `enteredPage = ? `;
    data.push(newObj.enteredPage); 
    arg_count++;
  }

  sql_str += ` WHERE id = ?`;
  data.push(id); 

  /** QUERY PARAMETER BINDING FOR UPDATE INTO DATABASE*/
  console.log("model object");
  console.log(newObj);
  //let data = [newObj.enteredPage, newObj.leftPage, newObj.whichPage, id];

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

      console.log("updated page activity: ", { id: id, ...newObj });
      result(null, { id: id, ...newObj });
    }
  );
};

module.exports = ActivityPage;
