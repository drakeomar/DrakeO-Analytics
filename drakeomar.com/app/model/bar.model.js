const sql = require("./db.js");

const BarObj = function(barobj){
  BarObj.usernum = barobj.usernum;
};

BarObj.getBarData = (result) => {
  let get_all_mouse_query = "SELECT * FROM activity_click";
  let get_all_keys_query = "SELECT * FROM activity_keys";
  
  let currentTime = new Date().getTime(); 

  let daySeconds = 86400000; 

  let keyCount1 = 0; 
  let keyCount2 = 0; 
  let keyCount3 = 0; 
  let keyCount4 = 0; 
  let keyCount5 = 0; 
  let keyCount6 = 0; 
  let keyCount7 = 0; 
  let keyArr = [];
  let clickCount1 = 0;
  let clickCount2 = 0;
  let clickCount3 = 0;
  let clickCount4 = 0;
  let clickCount5 = 0;
  let clickCount6 = 0;
  let clickCount7 = 0;
  let clickArr = [];

  sql.query(get_all_mouse_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("TESTING"); 
    console.log(res); 
    let mouseTime = 0; 
    
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    //console.log("today"); 
    //console.log(today); 
    
    let todayMS = new Date(today).getTime();
 
    //perform loop to get user agents and then change 
    //counters to reflect the total count
    for(let i = 0; i < res.length; i++){

        if(typeof res[i]['timestamp'] !== 'undefined'){
            //console.log(res[i]); 
            mouseTime = res[i]['timestamp']; 
            //console.log("mousetime"); 
            //console.log(mouseTime); 
            //console.log(todayMS); 
            //console.log(todayMS - daySeconds); 
            if(mouseTime > (todayMS - (7*daySeconds)) && mouseTime < (todayMS - (6*daySeconds))){
                
                clickCount1++;
            }else if(mouseTime > (todayMS - (6*daySeconds)) && mouseTime < (todayMS - (5*daySeconds))){
                clickCount2++; 
              
            }else if(mouseTime > (todayMS - (5*daySeconds)) && mouseTime < (todayMS - (4*daySeconds))){
                clickCount3++; 
              
            }else if(mouseTime > (todayMS - (4*daySeconds)) && mouseTime < (todayMS - (3*daySeconds))){
                clickCount4++; 
            
            }else if(mouseTime > (todayMS - (3*daySeconds)) && mouseTime < (todayMS - (2*daySeconds))){
                clickCount5++; 
           
            }else if(mouseTime > (todayMS - (2*daySeconds)) && mouseTime < (todayMS - daySeconds)){
                clickCount6++; 
             
            }else if(mouseTime > (todayMS - (daySeconds))) {
                clickCount7++; 
                //console.log("updating"); 
            }
          }
    }
    
    clickArr.push(clickCount1); 
    clickArr.push(clickCount2); 
    clickArr.push(clickCount3); 
    clickArr.push(clickCount4); 
    clickArr.push(clickCount5); 
    clickArr.push(clickCount6); 
    clickArr.push(clickCount7); 

    sql.query(get_all_keys_query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      for(let i = 0; i < res.length; i++){

        if(typeof res[i]['timestamp'] !== 'undefined'){
            console.log(res[i]); 
            keyTime = res[i]['timestamp']; 
            console.log("keytime"); 
            console.log(keyTime); 
            console.log(todayMS); 
            console.log(todayMS - daySeconds); 
            if(keyTime > (todayMS - (7*daySeconds)) && keyTime < (todayMS - (6*daySeconds))){
                //day 1
                keyCount1++;
            }else if(keyTime > (todayMS - (6*daySeconds)) && keyTime < (todayMS - (5*daySeconds))){
                keyCount2++; 
                //day 2
            }else if(keyTime > (todayMS - (5*daySeconds)) && keyTime < (todayMS - (4*daySeconds))){
                keyCount3++; 
              //day 3
            }else if(keyTime > (todayMS - (4*daySeconds)) && keyTime < (todayMS - (3*daySeconds))){
                keyCount4++; 
              //day 4
            }else if(keyTime > (todayMS - (3*daySeconds)) && keyTime < (todayMS - (2*daySeconds))){
                keyCount5++; 
              //day 5
            }else if(keyTime > (todayMS - (2*daySeconds)) && keyTime < (todayMS - daySeconds)){
                keyCount6++; 
              //day 6
            }else if(keyTime > (todayMS - (daySeconds))) {
                keyCount7++; 
                //console.log("updating"); 
                //console.log("count"); 
                //console.log(keyCount7); 

              //day 7
            }
          }          
      }

      console.log("count"); 
                console.log(keyCount7); 

      keyArr.push(keyCount1);
      keyArr.push(keyCount2); 
      keyArr.push(keyCount3);
      keyArr.push(keyCount4);
      keyArr.push(keyCount5);
      keyArr.push(keyCount6);
      keyArr.push(keyCount7);
    
      data = [todayMS - 6*(daySeconds), keyArr, clickArr];
      result(null, data);
    });

    

    //console.log("testing: ", data);
    
  } );
};

module.exports = BarObj; 