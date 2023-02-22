const sql = require("./db.js");

const LineObj = function(barobj){
  LineObj.usernum = barobj.usernum;
};

LineObj.getLineData = (result) => {
  let sql_query = "SELECT * FROM activity_page WHERE whichPage = ?";
  let index_data = ['https://drakeomar.com/'];
  let db_data = ['https://drakeomar.com/hw3/database.html'];
  let dv_data = ['https://drakeomar.com/hw3/hellodataviz.html'];
  
  let currentTime = new Date().getTime(); 

  let data = [];

  let daySeconds = 86400000; 

  let indexCount1 = 0; 
  let indexCount2 = 0; 
  let indexCount3 = 0; 
  let indexCount4 = 0; 
  let indexCount5 = 0; 
  let indexCount6 = 0; 
  let indexCount7 = 0; 
  let dbCount1 = 0; 
  let dbCount2 = 0; 
  let dbCount3 = 0; 
  let dbCount4 = 0; 
  let dbCount5 = 0; 
  let dbCount6 = 0; 
  let dbCount7 = 0;
  let dbArr = [];
  let dvCount1 = 0;
  let dvCount2 = 0;
  let dvCount3 = 0;
  let dvCount4 = 0;
  let dvCount5 = 0;
  let dvCount6 = 0;
  let dvCount7 = 0;
  let indexArr = []; 
  let dvArr = [];

  sql.query(sql_query, dv_data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("TESTING"); 
    console.log(res); 


    let dvTime = 0; 
    
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    console.log("today"); 
    console.log(today); 
    let todayMS = new Date(today).getTime();
 
    //perform loop to get user agents and then change 
    //counters to reflect the total count
    for(let i = 0; i < res.length; i++){

        if(typeof res[i]['enteredPage'] !== 'undefined'){
            //console.log(res[i]); 
            dvTime = new Date(res[i]['enteredPage']).getTime(); 
            console.log("dvtime"); 
            console.log(dvTime); 
            console.log(todayMS); 
            console.log(todayMS - daySeconds); 
            if(dvTime > (todayMS - (7*daySeconds)) && dvTime < (todayMS - (6*daySeconds))){
                //day 1
                dvCount1++;
            }else if(dvTime > (todayMS - (6*daySeconds)) && dvTime < (todayMS - (5*daySeconds))){
                dvCount2++; 
                //day 2
            }else if(dvTime > (todayMS - (5*daySeconds)) && dvTime < (todayMS - (4*daySeconds))){
                dvCount3++; 
              //3
            }else if(dvTime > (todayMS - (4*daySeconds)) && dvTime < (todayMS - (3*daySeconds))){
                dvCount4++; 
              //4
            }else if(dvTime > (todayMS - (3*daySeconds)) && dvTime < (todayMS - (2*daySeconds))){
              
                dvCount5++; 
              //5
            }else if(dvTime > (todayMS - (2*daySeconds)) && dvTime < (todayMS - daySeconds)){
                dvCount6++; 
              //6
            }else if(dvTime > (todayMS - (daySeconds))) {
                dvCount7++; 
                console.log("updating"); 
              //7
            }

         
          }
    }
    
    
    dvArr.push(dvCount1); 
    dvArr.push(dvCount2); 
    dvArr.push(dvCount3); 
    dvArr.push(dvCount4); 
    dvArr.push(dvCount5); 
    dvArr.push(dvCount6); 
    dvArr.push(dvCount7); 

    sql.query(sql_query, index_data, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      for(let i = 0; i < res.length; i++){

        if(typeof res[i]['enteredPage'] !== 'undefined'){
            console.log(res[i]); 
            indexTime = res[i]['enteredPage']; 
            indexTime = new Date(indexTime).getTime(); 
            console.log("indextime"); 
            console.log(indexTime); 
            console.log(todayMS); 
            console.log(todayMS - daySeconds); 
            if(indexTime > (todayMS - (7*daySeconds)) && indexTime < (todayMS - (6*daySeconds))){
                //update chrome count
                indexCount1++;
            }else if(indexTime > (todayMS - (6*daySeconds)) && indexTime < (todayMS - (5*daySeconds))){
                indexCount2++; 
                //update firefox count
            }else if(indexTime > (todayMS - (5*daySeconds)) && indexTime < (todayMS - (4*daySeconds))){
                indexCount3++; 
              //update firefox count
            }else if(indexTime > (todayMS - (4*daySeconds)) && indexTime < (todayMS - (3*daySeconds))){
                indexCount4++; 
              //update firefox count
            }else if(indexTime > (todayMS - (3*daySeconds)) && indexTime < (todayMS - (2*daySeconds))){
                indexCount5++; 
              //update firefox count
            }else if(indexTime > (todayMS - (2*daySeconds)) && indexTime < (todayMS - daySeconds)){
                indexCount6++; 
              //update firefox count
            }else if(indexTime > (todayMS - (daySeconds))) {
                indexCount7++; 
                console.log("updating"); 
                console.log("count"); 
                console.log(indexCount7); 

              //update firefox count
            }

         
          }

          
      }

      console.log("count"); 
                console.log(indexCount7); 

      indexArr.push(indexCount1);
      indexArr.push(indexCount2); 
      indexArr.push(indexCount3);
      indexArr.push(indexCount4);
      indexArr.push(indexCount5);
      indexArr.push(indexCount6);
      indexArr.push(indexCount7);
    
      sql.query(sql_query, db_data, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        for(let i = 0; i < res.length; i++){
  
          if(typeof res[i]['enteredPage'] !== 'undefined'){
              console.log(res[i]); 
              dbTime = res[i]['enteredPage']; 
              dbTime = new Date(dbTime).getTime(); 
              console.log("dbtime"); 
              console.log(dbTime); 
              console.log(todayMS); 
              console.log(todayMS - daySeconds); 
              if(dbTime > (todayMS - (7*daySeconds)) && dbTime < (todayMS - (6*daySeconds))){
                  
                  dbCount1++;
              }else if(dbTime > (todayMS - (6*daySeconds)) && dbTime < (todayMS - (5*daySeconds))){
                  dbCount2++; 
                  
              }else if(dbTime > (todayMS - (5*daySeconds)) && dbTime < (todayMS - (4*daySeconds))){
                  dbCount3++; 
                
              }else if(dbTime > (todayMS - (4*daySeconds)) && dbTime < (todayMS - (3*daySeconds))){
                  dbCount4++; 
                
              }else if(dbTime > (todayMS - (3*daySeconds)) && dbTime < (todayMS - (2*daySeconds))){
                  dbCount5++; 
                
              }else if(dbTime > (todayMS - (2*daySeconds)) && dbTime < (todayMS - daySeconds)){
                  dbCount6++; 
                
              }else if(dbTime > (todayMS - (daySeconds))) {
                  dbCount7++; 
                  console.log("updating"); 
                  console.log("count"); 
                  console.log(dbCount7); 
              }
  
           
            }
  
            
        }
  
        console.log("count"); 
                  console.log(dbCount7); 
  
        dbArr.push(dbCount1);
        dbArr.push(dbCount2); 
        dbArr.push(dbCount3);
        dbArr.push(dbCount4);
        dbArr.push(dbCount5);
        dbArr.push(dbCount6);
        dbArr.push(dbCount7);
      
      data = [todayMS - 6*(daySeconds), indexArr, dbArr, dvArr];
      result(null, data);
    });

    

    //console.log("testing: ", data);
    
  } );
}) ;
}
module.exports = LineObj; 