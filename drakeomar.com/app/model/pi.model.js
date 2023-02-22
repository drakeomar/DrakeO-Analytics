const sql = require("./db.js");

const PiObj = function(piobj){
  PiObj.usernum = piobj.usernum;
  //PiObj.google = piobj.google; 
  //PiObj.mozilla = piobj.mozilla; 
  //PiObj.safari = piobj.safari; 
  //PiObj.other = piobj.other; 
};

PiObj.getPiData = (result) => {
  let get_all_query = "SELECT * FROM static_gen";
  let useragent; 
  let googleCount = 0; 
  let firefoxCount = 0; 
  let safariCount = 0; 
  let otherCount = 0; 

  sql.query(get_all_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    
    //perform loop to get user agents and then change 
    //counters to reflect the total count
    for(let i = 0; i < res.length; i++){
        console.log(res[i]); 
        console.log(res[i]['userAgent']);
        if(typeof res[i]['userAgent'] !== 'undefined'){
            console.log(res[i]); 
            useragent = res[i]['userAgent']; 
            if(useragent.indexOf("Chrome") > -1){
                //update chrome count
                googleCount++;
            }else if(useragent.indexOf("Firefox")>-1){
                firefoxCount++; 
                //update firefox count
            }else if(useragent.indexOf("Safari") > -1){
                safariCount++; 
                //update safari count
            }else{
                //update other count
                otherCount++;
            }
        }
    }
    data = [googleCount, firefoxCount, safariCount, otherCount];

    console.log("testing: ", data);
    result(null, data);
  });
};

module.exports = PiObj; 