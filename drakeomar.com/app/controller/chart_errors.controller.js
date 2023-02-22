const chartObj = require("../model/errors.model.js");

function helper(data, key, errorMap){
    

}
/** use static dimensions model object to get data, then manipulate and return */
exports.retrieve = (req, res) => {
    chartObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            
            let returnData = {}; 
            let returnErrors = []; 
            let returnURLS = [];

            let errorMap = new Map(); 

            for (let key in data){

                //console.log(key);
                console.log(data[key]);
                
                let pageTime = 0; 

                    let daySeconds = 86400000; 
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
                    console.log("TODAYMS");
                    console.log(todayMS); 

                    console.log(key);
                    console.log(data[key]);
                    
                    if(typeof data[key]["timestamp"] !== 'undefined'){
                        console.log("TIMESTAMP"); 
                        console.log(data[key]["timestamp"]);
                        pageTime = new Date(parseInt(data[key]["timestamp"])).getTime(); 
                        console.log("PAGETIME"); 
                        console.log(pageTime);

                    }
                    
                    //valid for this week, continue with rest of logic and fill ranges
                    if(pageTime > (todayMS - (7*daySeconds))) {
                        if(typeof data[key]['url'] !== 'undefined'){
                            if(!errorMap.has(data[key]['url'])){
                                errorMap.set(data[key]['url'], 1);
                            }else{
                                let tmp = errorMap.get(data[key]['url']);
                                errorMap.set(data[key]['url'], tmp + 1);
                            }
        
                             
                        }
                    }

                
                
                returnData = {}; 
            }
            console.log(errorMap);

            /**SORT DATA */
            const mapSort1 = new Map([...errorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,10));
            console.log(mapSort1);

            console.log(mapSort1.entries());

            let i = 0; 
            let stopNum = 10; 
            let temp = {}; 
            /**GRAB TOP 5 */
            //for (const [key, value] of Object.entries(object)) {
                //console.log(key, value);
            //}

            for (const [key, value] of errorMap.entries()) {
                
                console.log(key, value);

                if(i < stopNum){
                    
                    temp[key] = value; 
                    returnErrors.push(value);
                    returnURLS.push(key);  
                    temp = {}; 
                    i++;  
                }

            }

            let finalReturn = []; 
            //tie together entry with url
            for(let key in returnErrors){
                let temp = returnURLS[key]; 
                finalReturn.push({url: temp,count:returnErrors[key]}); 
            }

            let testing = {}
            /*
            for (let key in data){
                
            }
            */
            res.send(finalReturn.sort((a, b) => parseFloat(b.count) - parseFloat(a.count)));
        }
    });
};